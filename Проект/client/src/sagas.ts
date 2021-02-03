import { put, takeLatest } from 'redux-saga/effects'
import {getType} from "typesafe-actions";
import {addPost, auth, deletePost, editPost, fetchCategories, init} from "./actions";
import {addPostAPI, authForAdmin, deletePostAPI, editPostAPI, getAllPosts, getCategories} from "./api";
import {AuthResponseData, CategoryData, Post} from "./types";

export default function* rootSaga() {
    yield takeLatest(getType(init.request), fetchPostsData);
    yield takeLatest(getType(auth.request), authAdmin);
    yield takeLatest(getType(deletePost.request), deletePostMethod);
    yield takeLatest(getType(editPost.request), editPostMethod);
    yield takeLatest(getType(addPost.request), addPostMethod);
    yield takeLatest(getType(fetchCategories.request), fetchCategoriesMethod);
}

export function* fetchPostsData() {
    try {
        const posts: Array<Post> = yield getAllPosts();
        yield put(init.success({categories: [], posts}));
        yield put(fetchCategories.request());
    }
    catch (e) {
        yield put(init.failure(e.message));
    }
}

export function* authAdmin(action: any) {
    try {
        const data: AuthResponseData = yield authForAdmin(action.payload);
        yield put(auth.success(data.isAuthed));
    }
    catch (e) {
        yield put(auth.failure(e.message));
    }
}

export function* deletePostMethod(action: any) {
    try {
        const data = yield deletePostAPI(action.payload);
        console.log(data);
        yield put(deletePost.success());
    }
    catch (e) {
        yield put(deletePost.failure(e.message));
    }
}

export function* editPostMethod(action: any) {
    try {
        const data = yield editPostAPI(action.payload);
        console.log(data);
        yield put(editPost.success());
    }
    catch (e) {
        yield put(editPost.failure(e.message));
    }
}

export function* addPostMethod(action: any) {
    try {
        const data = yield addPostAPI(action.payload);
        console.log(data);
        yield put(addPost.success());
    }
    catch (e) {
        yield put(addPost.failure(e.message));
    }
}

export function* fetchCategoriesMethod() {
    try {
        const data: Array<CategoryData> = yield getCategories();
        yield put(fetchCategories.success(data.map(item => item.name)));
    }
    catch (e) {
        yield put(fetchCategories.failure(e.message));
    }
}