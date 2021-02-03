"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.addPost = exports.editPost = exports.deletePost = exports.getAllPhotos = exports.getAllCategories = exports.addNewPost = exports.authAdmin = exports.getAllPosts = exports.connectToDatabase = void 0;
var mysql = require("mysql");
var config_1 = require("../config");
var connection = null;
function connectToDatabase(callback) {
    connection = mysql.createPool(__assign(__assign({}, config_1.databaseConfiguration), { connectionLimit: 10 }));
    callback("Connected to DB!");
}
exports.connectToDatabase = connectToDatabase;
function getAllPosts(callback) {
    connection.query('SELECT * FROM posts', function (error, results, fields) {
        if (error)
            throw error;
        var postsDB = results;
        getAllCategories(function (categoriesData) {
            getAllPhotos(function (photosData) {
                var responseData = postsDB.map(function (item) {
                    return {
                        postId: item.id,
                        title: item.title,
                        description: item.description,
                        image: photosData.find(function (ph) { return ph.id == item.photoId; }).photoURL,
                        featured: item.featured,
                        imageText: item.imageText,
                        date: item.date,
                        category: categoriesData.find(function (ct) { return ct.id == item.categoryId; }).name
                    };
                });
                callback(responseData);
            });
        });
    });
}
exports.getAllPosts = getAllPosts;
function authAdmin(login, password, callback) {
    connection.query('SELECT * FROM admins', function (error, results, fields) {
        if (error)
            throw error;
        var users = results;
        if (!!users.find(function (usr) { return usr.login === login && usr.password === password; })) {
            callback({ isAuthed: true });
        }
        else {
            callback({ isAuthed: false });
        }
    });
}
exports.authAdmin = authAdmin;
function addNewPost(callback) {
    connection.query("INSERT INTO posts (column1, column2, column3) VALUES (value1, value2, value3)", function (error, results, fields) {
        if (error)
            throw error;
        callback(results[0].result);
    });
}
exports.addNewPost = addNewPost;
function getAllCategories(callback) {
    connection.query('SELECT * FROM categories', function (error, results, fields) {
        if (error)
            throw error;
        callback(results);
    });
}
exports.getAllCategories = getAllCategories;
function getAllPhotos(callback) {
    connection.query('SELECT * FROM photos', function (error, results, fields) {
        if (error)
            throw error;
        callback(results);
    });
}
exports.getAllPhotos = getAllPhotos;
function deletePost(postID, callback) {
    connection.query("DELETE FROM posts WHERE id = " + postID, function (error) {
        if (error)
            throw error;
        callback();
    });
}
exports.deletePost = deletePost;
function editPost(postID, postJsonData, callback) {
    var postData = JSON.parse(postJsonData);
    var isNewImage = true;
    var imageId = -1;
    var newCategoryID = null;
    getAllPhotos(function (data) {
        var img = data.find(function (x) { return x.photoURL === postData.image; });
        if (!!img) {
            isNewImage = false;
            imageId = Number(img.id);
        }
        getAllCategories(function (data) {
            var category = data.find(function (x) { return x.name === postData.category; });
            newCategoryID = !!category ? category.id : null;
            if (isNewImage) {
                connection.query("INSERT INTO photos (photoURL) VALUES ('" + postData.image + "')", function (error) {
                    if (error)
                        throw error;
                    connection.query("SELECT MAX(id) FROM photos", function (error, result) {
                        imageId = result[0]["MAX(id)"];
                        console.log('id' + imageId);
                        updatePost();
                    });
                });
            }
            else {
                updatePost();
            }
        });
    });
    var updatePost = function () {
        connection.query("UPDATE posts SET title = '" + postData.title + "', description = '" + postData.description + "', photoId = '" + JSON.stringify(imageId) + "', imageText = '" + postData.imageText + "', featured = " + postData.featured + ", categoryId = '" + Number(newCategoryID) + "' WHERE id = " + postID, function (error) {
            if (error)
                throw error;
            callback();
        });
    };
}
exports.editPost = editPost;
function addPost(postJsonData, callback) {
    var postData = JSON.parse(postJsonData);
    var isNewImage = true;
    var imageId = -1;
    var newCategoryID = null;
    getAllPhotos(function (data) {
        var img = data.find(function (x) { return x.photoURL === postData.image; });
        if (!!img) {
            isNewImage = false;
            imageId = Number(img.id);
        }
        getAllCategories(function (data) {
            var category = data.find(function (x) { return x.name === postData.category; });
            newCategoryID = !!category ? category.id : null;
            if (isNewImage) {
                connection.query("INSERT INTO photos (photoURL) VALUES ('" + postData.image + "')", function (error) {
                    if (error)
                        throw error;
                    connection.query("SELECT MAX(id) FROM photos", function (error, result) {
                        imageId = result[0]["MAX(id)"];
                        console.log('id' + imageId);
                        addPost();
                    });
                });
            }
            else {
                addPost();
            }
        });
    });
    var addPost = function () {
        connection.query("INSERT INTO posts (title, description, photoId, imageText, featured, categoryId) VALUES ('" + postData.title + "', '" + postData.description + "', '" + imageId + "', '" + postData.imageText + "', '" + (postData.featured ? 1 : 0) + "', '" + newCategoryID + "')", function (error) {
            if (error)
                throw error;
            callback();
        });
    };
}
exports.addPost = addPost;
function closeConnection() {
    connection.end();
}
exports.closeConnection = closeConnection;
