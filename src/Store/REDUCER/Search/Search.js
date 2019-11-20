import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    result : [],
    group : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.SEARCH_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.SEARCH_SUCCESS] : (state,action) => Object.assign({},state, {result : action.payload.data.user, group : action.payload.data.group,isLoading : false}),
    [type.SEARCH_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
    [type.FRIEND_REQUEST_REQUEST] : (state,action)=> { console.log(state , action.payload)
        return { result : [...state.result.slice(0,action.payload),{
        ID : state.result[action.payload].ID,
        NAME : state.result[action.payload].NAME,
        ROW_ID : state.result[action.payload].ROW_ID,
        CHECK : state.result[action.payload].CHECK,
        isLoading : true
    } ,...state.result.slice(action.payload+1,state.result.length)], isLoading : false, error : null}},
    [type.FRIEND_REQUEST_SUCCESS] : (state,action)=> {
        console.log(state.result)
        console.log(action.payload)
        return { result : [...state.result.slice(0,action.payload.index),{
        ID : state.result[action.payload.index].ID,
        NAME : state.result[action.payload.index].NAME,
        ROW_ID : action.payload.ROW_ID,
        CHECK : action.payload.CHECK,
        isLoading : false
    } ,...state.result.slice(action.payload.index+1,state.result.length)], isLoading : false, error : null}}
    // [type.SEARCH_MORE] :  (state,action) => Object.assign({},state, {result : [...state.result,action.payload], isLoading : false}),
}, initialState)