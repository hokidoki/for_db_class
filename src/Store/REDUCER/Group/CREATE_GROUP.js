import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    isLoading : false,
    error : null
}

export default handleActions({
    [type.CREATE_GROUP_REQUEST] : (state) => Object.assign({},state, {isLoading : true}),
    [type.CREATE_GROUP_SUCCESS] : (state) => Object.assign({},state, {isLoading : false}),
    [type.CREATE_GROUP_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
}, initialState)