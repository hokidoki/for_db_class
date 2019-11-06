import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    article : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.GET_ARTICLE_THIS_MONTH_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.GET_ARTICLE_THIS_MONTH_SUCCESS ] : (state,action) => Object.assign({},state, {isLoading : false}),
    [type.GET_ARTICLE_THIS_MONTH_FAILED ] : (state,action) => Object.assign({},state, {isLoading : true, error : action.payload}),
}, initialState)