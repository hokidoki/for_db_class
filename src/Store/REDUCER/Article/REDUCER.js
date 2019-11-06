import { combineReducers } from 'redux';
import postArticle from './PostArticle';
import userArticle from './UserArticle';

export default combineReducers({
    postArticle,
    userArticle
})

