import { combineReducers } from 'redux';
import postArticle from './PostArticle';
import userArticle from './UserArticle';
import getArticle from './GetArticle';
import postComment from './PostArticle';
import getComment from './GetComment';

export default combineReducers({
    postArticle,
    userArticle,
    getArticle,
    getComment,
    postComment,
})

