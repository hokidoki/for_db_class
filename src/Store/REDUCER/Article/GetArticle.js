import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    article : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.GET_ARTICLE_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.GET_ARTICLE_SUCCESS ] : (state,action) => Object.assign({},state, {article : action.payload, isLoading : false}),
    [type.GET_ARTICLE_FAILED ] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
    [type.GET_ARTICLE_RESET] : (state,action) => Object.assign({}, {},{article : []}),
    [type.POST_ARTICLE_SUCCESS ] : (state,action) => {
        const updatedArticle = action.payload;
        const array = [updatedArticle,...state.article.data];
        return Object.assign({},{},  { article : { 
        data : array
    },isLoading : false, error : false})},
    [type.GET_UPDATED_ARTICLE] : (state,action) =>{
        const articleIndex = action.payload.index;
        const updatedArticle = action.payload.updatedArticle
        return Object.assign({}, {}, {
            article : { data : [
            ...state.article.data.slice(0,articleIndex),updatedArticle,...state.article.data.slice(articleIndex +1,state.article.length) 
        ]},isLoading : false, error : false})
    },
    [type.DELETE_ARTICLE] : (state,action) =>{
        const articleIndex = action.payload.index;
        return Object.assign({}, {}, {
            article : { data : [
            ...state.article.data.slice(0,articleIndex),{
                deleted : true
            },...state.article.data.slice(articleIndex +1,state.article.length) 
        ]},isLoading : false, error : false})
    }
}, initialState)