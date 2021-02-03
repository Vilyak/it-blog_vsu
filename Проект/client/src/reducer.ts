import {Actions, AdminOpenType, BlogStore, Post} from "./types";
import {Reducer} from "redux";
import {getType} from "typesafe-actions";
import {
    addPost,
    auth,
    deletePost,
    editPost,
    fetchCategories,
    init,
    loginDialogState, openAdminPanelStatus, changeViewPostState,
    toggleOnAddPostState,
    toggleOnEditState
} from "./actions";

const initialState: BlogStore = {
    categories: [],
    posts: [],
    isOpenLogin: false,
    isAuthed: false,
    isOpenAdminPanel: false,
    updatesCount: 0,
    adminTabState: {
        openType: AdminOpenType.ADD,
    },
    openPostState: {
        isOpenPost: false,
    }
}

export const BlogReducer: Reducer<BlogStore, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(init.success):
            return {...state, ...action.payload};
        case getType(loginDialogState):
            return {...state, isOpenLogin: action.payload};
        case getType(auth.success):
            return {...state, isOpenLogin: false, isAuthed: action.payload, isOpenAdminPanel: true};
        case getType(openAdminPanelStatus):
            return {...state, isOpenAdminPanel: action.payload};
        case getType(changeViewPostState):
            return {...state, openPostState: {isOpenPost: action.payload.state, currentPost: action.payload.post}};
        case getType(editPost.success):
        case getType(deletePost.success):
        case getType(addPost.success):
            return {...state, updatesCount: state.updatesCount + 1};
        case getType(fetchCategories.success):
            return {...state, categories: action.payload};
        case getType(toggleOnEditState):
            return {...state, adminTabState: {...state.adminTabState, openType: AdminOpenType.EDIT, selectedPost: action.payload}};
        case getType(toggleOnAddPostState):
            return {...state, adminTabState: {...state.adminTabState, openType: AdminOpenType.ADD, selectedPost: {
                        postId: '',
                        title: '',
                        description: '',
                        image: '',
                        imageText: '',
                        featured: false
                    }}};
        default:
            return state;
    }
}