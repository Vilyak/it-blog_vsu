export interface PostDataDB {
    id: number;
    title: string;
    description: string;
    photoId: number;
    featured: boolean;
    imageText?: string;
    date?: Date;
    categoryId?: number;
}

export interface PostDataForClient {
    postId: number;
    title: string;
    description: string;
    image?: string;
    featured: boolean;
    imageText?: string;
    date?: Date;
    category?: string;
}

export interface EditPostDataFromClient {
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

export interface PhotoData {
    id: number;
    photoURL: string;
}

export interface CategoryData {
    id: number;
    name: string;
}

export interface AdminsDB {
    login: string;
    password: string;
}

export interface ClientAuthData {
    login: string;
    password: string;
}