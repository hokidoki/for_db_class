import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import {updatedArticle } from './Article.js';

const postCommentRequest = createAction(ActionType.POST_COMMENT_REQUEST);
const postCommentSuccess = createAction(ActionType.POST_COMMENT_SUCCESS);
const postCommentFailed = createAction(ActionType.POST_COMMENT_FAILED);

export const postComment = (articleId,comment,index) =>{
    
    return (dispatch,getState) =>{
        dispatch(postCommentRequest());

        const commentWrtier = getState().USER.sign_in.user.ID;

        axios.post('https://www.hokeys.com:431/article/comment',{
            ARTICLE_ROW_ID : articleId,
            WRITER : commentWrtier,
            COMMENT : comment
        }).then((result)=>{
            dispatch(postCommentSuccess());
            dispatch(updatedArticle(articleId,index))
        }).catch((err)=>{
            dispatch(postCommentFailed());  
        })
    }
}

export const postReComment = (articleId,commentId,comment,index) =>{
    
    return (dispatch,getState) =>{
        dispatch(postCommentRequest());

        const commentWrtier = getState().USER.sign_in.user.ID;

        axios.post('https://www.hokeys.com:431/article/comment/recomment',{
            COMMENT_ROW_ID : commentId,
            WRITER : commentWrtier,
            COMMENT : comment
        }).then((result)=>{
            dispatch(postCommentSuccess());
            dispatch(updatedArticle(articleId,index))
           
        }).catch((err)=>{
            dispatch(postCommentFailed());  
        })
    }
}