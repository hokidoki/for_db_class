import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    article : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.POST_ARTICLE_REQUEST ] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.POST_ARTICLE_SUCCESS ] : (state,action) => Object.assign({},state, {isLoading : false}),
    [type.POST_ARTICLE_FAILED ] : (state,action) => Object.assign({},state, {isLoading : true, error : action.payload}),
}, initialState)