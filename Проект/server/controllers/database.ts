import * as mysql from 'mysql';
import {databaseConfiguration} from "../config";
import {AdminsDB, CategoryData, EditPostDataFromClient, PhotoData, PostDataDB, PostDataForClient} from "../types";

let connection = null;

export function connectToDatabase(callback: (message: string) => void) {
    connection = mysql.createPool({...databaseConfiguration, connectionLimit : 10});
    callback("Connected to DB!");
}


export function getAllPosts(callback: (data: Array<PostDataForClient>) => void) {
    connection.query('SELECT * FROM posts', function (error, results, fields) {
        if (error) throw error;
        const postsDB: Array<PostDataDB> = results;
        getAllCategories((categoriesData: Array<CategoryData>) => {
            getAllPhotos((photosData: Array<PhotoData>) => {
                const responseData: Array<PostDataForClient> = postsDB.map((item) => {
                    return {
                        postId: item.id,
                        title: item.title,
                        description: item.description,
                        image: photosData.find(ph => ph.id == item.photoId).photoURL,
                        featured: item.featured,
                        imageText: item.imageText,
                        date: item.date,
                        category: categoriesData.find(ct => ct.id == item.categoryId).name
                    }
                });
                callback(responseData);
            });
        });
    });
}

export function authAdmin(login: string, password: string, callback: (data: any) => void) {
    connection.query('SELECT * FROM admins', function (error, results, fields) {
        if (error) throw error;
        const users: Array<AdminsDB> = results;
        if (!!users.find(usr => usr.login === login && usr.password === password)) {
            callback({isAuthed: true});
        }
        else {
            callback({isAuthed: false});
        }
    });
}

export function addNewPost(callback: (data: any) => void) {
    connection.query(`INSERT INTO posts (column1, column2, column3) VALUES (value1, value2, value3)`, function (error, results, fields) {
        if (error) throw error;
        callback(results[0].result);
    });
}

export function getAllCategories(callback: (data: any) => void) {
    connection.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

export function getAllPhotos(callback: (data: any) => void) {
    connection.query('SELECT * FROM photos', function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

export function deletePost(postID: string, callback: () => void) {
    connection.query(`DELETE FROM posts WHERE id = ${postID}`, function (error) {
        if (error) throw error;
        callback();
    });
}

export function editPost(postID: string, postJsonData: string, callback: () => void) {
    const postData: EditPostDataFromClient = JSON.parse(postJsonData);
    let isNewImage: boolean = true;
    let imageId: number = -1;
    let newCategoryID: number | void = null;

    getAllPhotos((data: Array<{id: number, photoURL: string}>) => {
        const img = data.find(x => x.photoURL === postData.image);
        if (!!img) {
            isNewImage = false;
            imageId = Number(img.id);
        }
        getAllCategories((data: Array<{id: number, name: string}>) => {
            const category = data.find(x => x.name === postData.category);
            newCategoryID = !!category ? category.id : null;
            if (isNewImage) {
                connection.query(`INSERT INTO photos (photoURL) VALUES ('${postData.image}')`, function (error) {
                    if (error) throw error;
                    connection.query(`SELECT MAX(id) FROM photos`, function (error, result) {
                        imageId = result[0]["MAX(id)"];
                        console.log('id' + imageId);
                        updatePost();
                    });
                });
            }
            else {
                updatePost();
            }
        })

    });
    const updatePost = () => {
        connection.query(`UPDATE posts SET title = '${postData.title}', description = '${postData.description}', photoId = '${JSON.stringify(imageId)}', imageText = '${postData.imageText}', featured = ${postData.featured}, categoryId = '${Number(newCategoryID)}' WHERE id = ${postID}`, function (error) {
            if (error) throw error;
            callback();
        });
    }
}

export function addPost(postJsonData: string, callback: () => void) {
    const postData: EditPostDataFromClient = JSON.parse(postJsonData);
    let isNewImage: boolean = true;
    let imageId: number = -1;
    let newCategoryID: number | void = null;

    getAllPhotos((data: Array<{id: number, photoURL: string}>) => {
        const img = data.find(x => x.photoURL === postData.image);
        if (!!img) {
            isNewImage = false;
            imageId = Number(img.id);
        }
        getAllCategories((data: Array<{id: number, name: string}>) => {
            const category = data.find(x => x.name === postData.category);
            newCategoryID = !!category ? category.id : null;
            if (isNewImage) {
                connection.query(`INSERT INTO photos (photoURL) VALUES ('${postData.image}')`, function (error) {
                    if (error) throw error;
                    connection.query(`SELECT MAX(id) FROM photos`, function (error, result) {
                        imageId = result[0]["MAX(id)"];
                        console.log('id' + imageId);
                        addPost();
                    });
                });
            }
            else {
                addPost();
            }
        })

    });
    const addPost = () => {
        connection.query(`INSERT INTO posts (title, description, photoId, imageText, featured, categoryId) VALUES ('${postData.title}', '${postData.description}', '${imageId}', '${postData.imageText}', '${postData.featured ? 1 : 0}', '${newCategoryID}')`, function (error) {
            if (error) throw error;
            callback();
        });
    }
}


export function closeConnection() {
    connection.end();
}