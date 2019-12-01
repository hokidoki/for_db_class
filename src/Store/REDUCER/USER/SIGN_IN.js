import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    user : null,
    friends :[],
    isLoading : false,
    error : null
}

export default handleActions({
    [type.SIGN_IN_REQUEST] : (state) => Object.assign({},state, {isLoading : true}),
    [type.SIGN_IN_SUCCESS] : (state,action) => Object.assign({},state, { user : action.payload, isLoading : false}),
    [type.SIGN_IN_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error: action.payload}),
    [type.LOGOUT] : (state) => Object.assign({},state, {user : null, isLoading : false}),
    [type.GET_WHO_FOLLOW_ME_SUCCESS] : (state,action) => Object.assign({},state,{ whoFollowMe : action.data}),
}, initialState)