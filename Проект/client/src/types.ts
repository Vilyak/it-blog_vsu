import {ActionType} from "typesafe-actions";
import * as actions from './actions';

export interface Post {
    postId: string;
    title: string;
    description: string;
    image: string;
    imageText: string;
    featured: boolean;
    linkText?: string;
    date?: string;
    category?: string;
}

export interface BlogStore {
    categories: Array<string>;
    posts: Array<Post>;
    isOpenLogin: boolean;
    isAuthed: boolean | void;
    isOpenAdminPanel: boolean;
    updatesCount: number;
    adminTabState: {
        openType: AdminOpenType,
        selectedPost?: Post;
    };
    openPostState: {
        currentPost?: Post;
        isOpenPost: boolean;
    }
}

export interface InitialData {
    categories: Array<string>;
    posts: Array<Post>;
}

export interface FilteredPosts {
    mainFeaturedPost?: Post;
    featuredPosts: Array<Post>;
    posts: Array<Post>;
}

export interface ClientAuthData {
    login: string;
    password: string;
}

export interface AuthResponseData {
    isAuthed: boolean;
}

export interface CategoryData {
    id: number;
    name: string;
}

export enum AdminOpenType {
    ADD,
    EDIT
}

export type Actions = ActionType<typeof actions>