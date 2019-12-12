import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    result : [],
    group : [],
    article : [],
    whoFollow : {},
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.SEARCH_REQUEST] : (state,action) => Object.assign({},state, {result : [],group:[],article : [],isLoading : true}),
    [type.SEARCH_SUCCESS] : (state,action) => Object.assign({},state, {result : action.payload.data.user, group : action.payload.data.group, article: action.payload.data.article, isLoading : false}),
    [type.SEARCH_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
    [type.FRIEND_REQUEST_REQUEST] : (state,action)=> { console.log(state , action.payload)
        return  Object.assign({},state,{result : [...state.result.slice(0,action.payload),{
        ID : state.result[action.payload].ID,
        NAME : state.result[action.payload].NAME,
        ROW_ID : state.result[action.payload].ROW_ID,
        CHECK : state.result[action.payload].CHECK,
        PROFILE_IMAGE : state.result[action.payload].PROFILE_IMAGE,
        isLoading : true
    } ,...state.result.slice(action.payload+1,state.result.length)], isLoading : false, error : null})},
    [type.FRIEND_REQUEST_SUCCESS] : (state,action)=> {
        console.log(action.payload)
        return Object.assign({},state,{result : [...state.result.slice(0,action.payload.index),{
        ID : state.result[action.payload.index].ID,
        NAME : state.result[action.payload.index].NAME,
        ROW_ID : action.payload.ROW_ID,
        CHECK : action.payload.CHECK,
        PROFILE_IMAGE : state.result[action.payload.index].PROFILE_IMAGE,
        isLoading : false
    } ,...state.result.slice(action.payload.index+1,state.result.length)], isLoading : false, error : null})},
    [type.GET_WHO_FOLLOW_ME_SUCCESS] : (state,action) => Object.assign({},state,{whoFollow : action.payload}),
    [type.GROUP_JOIN_REQUEST] : (state,action)=> { console.log(state , action.payload)
        return Object.assign({},state,{ group : [...state.group.slice(0,action.payload),{
        group_master : state.group[action.payload].group_master,
        group_name : state.group[action.payload].group_name,
        group_id : state.group[action.payload].group_id,
        check : state.group[action.payload].check,
        group_comment : state.group[action.payload].group_comment,
        created_at : state.group[action.payload].created_at,
        member_row_id : state.group[action.payload].member_row_id,
        member_id : state.group[action.payload].member_id,
        group_key : state.group[action.payload].group_key,
        isLoading : true
    } ,...state.group.slice(action.payload+1,state.group.length)], isLoading : false, error : null})},
    [type.GROUP_JOIN_SUCCESS] : (state,action)=> { console.log(state , action.payload)
        return Object.assign({},state,{ group : [...state.group.slice(0,action.payload.index),{
        group_master : state.group[action.payload.index].group_master,
        group_name : state.group[action.payload.index].group_name,
        group_id : action.payload.ROW_ID.group_key,
        check : action.payload.CHECK,
        group_comment : state.group[action.payload.index].group_comment,
        created_at : state.group[action.payload.index].created_at,
        member_row_id : action.payload.ROW_ID.member_row_id,
        member_id : action.payload.ROW_ID.member_id,
        group_key : state.group[action.payload.index].group_key,
        isLoading : false
    } ,...state.group.slice(action.payload.index+1,state.group.length)], isLoading : false, error : null})}
}, initialState)

// [type.GROUP_JOIN_REQUEST] : (state,action)=> { console.log(state , action.payload)
//     return Object.assign({},state,{ group : [...state.group.slice(0,action.payload),{
//     group_master : state.group[action.payload].group_masrter,
//     name : state.group[action.payload].group_name,
//     group_id : state.group[action.payload].group_id,
//     check : action.payload.check,
//     comment : state.group[action.payload].comment,
//     created_at : state.group[action.payload].created_at,
//     member_row_id : action.payload.member_row_id,
//     group_key : state.group[action.payload].group_key,
//     isLoading : false
// } ,...state.group.slice(action.payload+1,state.group.length)], isLoading : false, error : null})}