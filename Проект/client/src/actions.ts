import {createAction, createAsyncAction} from "typesafe-actions";
import {ClientAuthData, InitialData, Post} from "./types";

export const init = createAsyncAction(
    'BLOG/INIT_REQUEST',
    'BLOG/INIT_SUCCESS',
    'BLOG/INIT_FAILURE',
)<void, InitialData, string>();

export const loginDialogState = createAction('BLOG/LOGIN_DIALOG_STATE')<boolean>();

export const openAdminPanelStatus = createAction('BLOG/ADMIN_SET_DIALOG_STATE')<boolean>();

export const changeViewPostState = createAction('BLOG/OPEN_POST_STATE')<{state: boolean; post?: Post}>();

export const auth = createAsyncAction(
    'BLOG/AUTH_REQUEST',
    'BLOG/AUTH_SUCCESS',
    'BLOG/AUTH_FAILURE',
)<ClientAuthData, boolean, string>();

export const fetchCategories = createAsyncAction(
    'BLOG/FETCH_CATEGORIES_REQUEST',
    'BLOG/FETCH_CATEGORIES_SUCCESS',
    'BLOG/FETCH_CATEGORIES_FAILURE',
)<void, Array<string>, string>();

export const deletePost = createAsyncAction(
    'BLOG/DELETE_REQUEST',
    'BLOG/DELETE_SUCCESS',
    'BLOG/DELETE_FAILURE',
)<number, void, string>();

export const editPost = createAsyncAction(
    'BLOG/EDIT_REQUEST',
    'BLOG/EDIT_SUCCESS',
    'BLOG/EDIT_FAILURE',
)<Post, void, string>();

export const addPost = createAsyncAction(
    'BLOG/ADD_REQUEST',
    'BLOG/ADD_SUCCESS',
    'BLOG/ADD_FAILURE',
)<Post, void, string>();

export const toggleOnEditState = createAction('BLOG/EDIT_STATE')<Post>();

export const toggleOnAddPostState = createAction('BLOG/ADD_STATE')<void>();
