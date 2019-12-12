import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    comment : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.GET_COMMENT_SUCCESS ] : (state,action) => Object.assign({},state, {comment : action.payload, isLoading : false}),
    [type.GET_COMMENT_FAILED ] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
    [type.GET_COMMENT_RESET] : (state) => Object.assign({}, {}, { comment : [],isLoading : false, error : false}),
    [type.GET_UPDATED_COMMENT] : (state,action) =>{
        const commentIndex = action.payload.index;
        const updatedComment = action.payload.updatedComment;

        return Object.assign({}, state, { comment: [
            ...state.comment.slice(0,commentIndex),updatedComment,...state.comment.slice(commentIndex+1,state.comment.length) 
        ],isLoading : false, error : false})
    },
    [type.POST_ARTICLE_SUCCESS] : (state) => Object.assign({}, {}, { comment : [[],...state.comment],isLoading : false, error : false}),
    [type.GET_ARTICLE_RESET] : () => Object.assign({} , {},{ comment : [],isLoading : false, error : false}) 
}, initialState)