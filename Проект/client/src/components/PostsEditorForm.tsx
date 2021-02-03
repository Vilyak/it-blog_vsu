import {makeStyles} from '@material-ui/core/styles';
import Form from "@rjsf/material-ui";
import {JSONSchema7} from "json-schema";
import React, {useCallback, useMemo} from "react";
import {Button, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AdminOpenType, BlogStore, Post} from "../types";
import {addPost, editPost, toggleOnAddPostState} from "../actions";

const useStyles = makeStyles({
    rootForm: {
        padding: '20px'
    },
    paper: {
        margin: '55px ​0 20px 0 !important'
    }
});

interface Props {
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

export default function PostsEditorForm(props: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {categories, adminTabState} = useSelector((store: BlogStore) => store);
    const {openType, selectedPost} = adminTabState;

    const getProperty = useCallback((name: keyof Post, isBoolean: boolean = false) => {
        if (openType == AdminOpenType.EDIT && selectedPost) {
            return selectedPost[name];
        }
        return isBoolean ? false : "";
    }, [openType, selectedPost]);

    const schema = useMemo(() => {
        const baseSchema: JSONSchema7 = {
            title: openType == AdminOpenType.EDIT ? "Изменение поста" : "Добавление нового поста",
            type: "object",
            required: ['title', 'description', 'image', 'featured'],
            properties: {
                title: {type: "string", title: "Заголовок", default: getProperty('title')},
                description: {type: "string", title: "Описание", default: getProperty('description')},
                image: {type: "string", title: "Ссылка на изображение", default: ""},
                imageText: {type: "string", title: "Подпись к изображению", default: getProperty('imageText')},
                linkText: {type: "string", title: "Текст ссылки", default: getProperty('linkText')},
                category: {type: "string", title: "Категория", enum: categories ,default: getProperty('category')},
                featured: {type: "boolean", title: "Это фичерный пост? (отображается на главной странице, в большом блоке)", default: 0}
            }
        };
        return baseSchema;
    }, [categories, openType]);

    const formData = useMemo(() => {
        if (selectedPost) {
            return selectedPost;
        }
        else {
            return {
                postId: '',
                title: '',
                description: '',
                image: '',
                imageText: '',
                featured: false
            }
        }
    }, [selectedPost]);

    return (
        <Paper className={classes.paper}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => {dispatch(toggleOnAddPostState());}}>
                Добавить новый пост
            </Button>
            <Form schema={schema}  formData={formData} className={classes.rootForm} onSubmit={(e) => {
                if (openType == AdminOpenType.EDIT) {
                    dispatch(editPost.request(e.formData));
                    dispatch(toggleOnAddPostState());
                }
                else  {
                    dispatch(addPost.request(e.formData))
                    dispatch(toggleOnAddPostState());
                }
            }}/>

        </Paper>
    );
}
