import * as express from 'express';
import {ADD_POST, AUTH_ADMIN, DELETE_POST, EDIT_POST, GET_CATEGORIES_URL, GET_POSTS_URL} from "./urls";
import {
    addPost,
    authAdmin,
    connectToDatabase,
    deletePost,
    editPost,
    getAllCategories,
    getAllPosts
} from "./controllers/database";

const app = express()
const port = 8080

app.get(`/${GET_CATEGORIES_URL}`, (req, res) => {
    getAllCategories((data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${GET_POSTS_URL}`, (req, res) => {
    getAllPosts((data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${AUTH_ADMIN}`, (req, res) => {
    authAdmin(req.param('login'), req.param('password'), (data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${DELETE_POST}`, (req, res) => {
    const postId = req.param('postId');
    deletePost(req.param('postId'), () => {
        appendCors(res);
        res.send({postId});
    });
});

app.get(`/${EDIT_POST}`, (req, res) => {
    const postId = req.param('postID');
    const posDataJSON = req.param('postData');
    editPost(postId, posDataJSON, () => {
        appendCors(res);
        res.send({postId});
    });
});

app.get(`/${ADD_POST}`, (req, res) => {
    const posDataJSON = req.param('postData');
    addPost(posDataJSON, () => {
        appendCors(res);
        res.send({success: true});
    });
});


function appendCors(res: any){
    res.setHeader('Access-Control-Allow-Origin', '*')
}

app.listen(port, () => {
    console.log(`Server listening at port : ${port}`);
    connectToDatabase((message: string) => {
        console.log(message);
    });
})