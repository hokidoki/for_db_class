import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.POST_COMMENT_REQUEST ] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.POST_COMMENT_SUCCESS ] : (state) => Object.assign({},state, {isLoading : false}),
    [type.POST_COMMENT_FAILED ] : (state,action) => Object.assign({},state, {isLoading : true, error : action.payload}),
}, initialState)