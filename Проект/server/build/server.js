"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var urls_1 = require("./urls");
var database_1 = require("./controllers/database");
var app = express();
var port = 8080;
app.get("/" + urls_1.GET_CATEGORIES_URL, function (req, res) {
    database_1.getAllCategories(function (data) {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});
app.get("/" + urls_1.GET_POSTS_URL, function (req, res) {
    database_1.getAllPosts(function (data) {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});
app.get("/" + urls_1.AUTH_ADMIN, function (req, res) {
    database_1.authAdmin(req.param('login'), req.param('password'), function (data) {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});
app.get("/" + urls_1.DELETE_POST, function (req, res) {
    var postId = req.param('postId');
    database_1.deletePost(req.param('postId'), function () {
        appendCors(res);
        res.send({ postId: postId });
    });
});
app.get("/" + urls_1.EDIT_POST, function (req, res) {
    var postId = req.param('postID');
    var posDataJSON = req.param('postData');
    database_1.editPost(postId, posDataJSON, function () {
        appendCors(res);
        res.send({ postId: postId });
    });
});
app.get("/" + urls_1.ADD_POST, function (req, res) {
    var posDataJSON = req.param('postData');
    database_1.addPost(posDataJSON, function () {
        appendCors(res);
        res.send({ success: true });
    });
});
function appendCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
}
app.listen(port, function () {
    console.log("Server listening at port : " + port);
    database_1.connectToDatabase(function (message) {
        console.log(message);
    });
});
