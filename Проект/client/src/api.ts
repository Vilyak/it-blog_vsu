import ax from "axios";
import {ADD_POST_URL, AUTH_ADMIN, DELETE_POST_URL, EDIT_POST_URL, GET_CATEGORIES_URL, GET_POSTS_URL} from "./urls";
import {ROOT_URL} from "./config";
import {ClientAuthData, Post} from "./types";

export async function getAllPosts() {
    const {data} = await ax.get(`${ROOT_URL}${GET_POSTS_URL}`);
    return data;
}

export async function getCategories() {
    const {data} = await ax.get(`${ROOT_URL}${GET_CATEGORIES_URL}`);
    return data;
}

export async function authForAdmin(authData: ClientAuthData) {
    const {data} = await ax.get(`${ROOT_URL}${AUTH_ADMIN}?login=${authData.login}&password=${authData.password}`);
    return data;
}

export async function deletePostAPI(postId: number) {
    const {data} = await ax.get(`${ROOT_URL}${DELETE_POST_URL}?postId=${postId}`);
    return data;
}

export async function editPostAPI(post: Post) {
    const {data} = await ax.get(`${ROOT_URL}${EDIT_POST_URL}?postID=${post.postId}&postData=${JSON.stringify(post)}`);
    return data;
}

export async function addPostAPI(post: Post) {
    const {data} = await ax.get(`${ROOT_URL}${ADD_POST_URL}?postData=${JSON.stringify(post)}`);
    return data;
}