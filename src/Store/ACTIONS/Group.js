import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { modal_close } from '../REDUCER/Modal';

const createGroupRequest = createAction(ActionType.CREATE_GROUP_REQUEST);
const createGroupSuccess = createAction(ActionType.CREATE_GROUP_SUCCESS);
const createGroupFailed = createAction(ActionType.CREATE_GROUP_FAILED);

export const getAdminGroupSuccess = createAction(ActionType.GET_ADMIN_GROUP_SUCCESS);
// const getNewAdminGroupSuccess = createAction(ActionType.GET_NEW_ADMIN_GROUP_SUCCESS);

export const createGroup = (groupName, groupComment) =>{
    
    return (dispatch,getState) =>{
        dispatch(createGroupRequest());

        const user = getState().USER.sign_in.user.ID;
        console.log(user)
        axios.post('http://127.0.0.1:8000/group/create',{
            groupName : groupName,
            groupComment : groupComment,
            admin : user 
        }).then((result)=>{
            dispatch(createGroupSuccess());
            dispatch(modal_close());
            dispatch(getAdminGroupSuccess(result));
        }).catch((err)=>{
            dispatch(createGroupFailed(err));  
        })
    }
}

const groupJoinRequest = createAction(ActionType.GROUP_JOIN_REQUEST);
const groupJoinSuccess = createAction(ActionType.GROUP_JOIN_SUCCESS);
const groupJoinFailed = createAction(ActionType.GROUP_JOIN_FAILED);

export const groupJoin = (GROUP_KEY, MEMBER_ROW_ID ,CHECK, index) => {
    return (dispatch, getState) => {

        const userId = getState().USER.sign_in.user.ID;
        dispatch(groupJoinRequest(index))


        if (!MEMBER_ROW_ID) {
            axios.post('http://127.0.0.1:8000/group/join', {
                USER_ID: userId,
                GROUP_KEY: GROUP_KEY
            }).then((result) => {
                var action = {
                    index: index,
                    CHECK: true,
                    ROW_ID: result.data[0],
                }
                console.log(result)
                dispatch(groupJoinSuccess(action));
            }).catch((err) => {
                dispatch(groupJoinFailed(err));
            })
        } else {
            axios.put('http://127.0.0.1:8000/group/join', {
                MEMBER_ROW_ID: MEMBER_ROW_ID,
                REQUEST_CHECK_STATE: !CHECK
            }).then(() => {
                var action = {
                    index: index,
                    CHECK: !CHECK,
                    MEMBER_ROW_ID: MEMBER_ROW_ID,
                }
                console.log('a')
                dispatch(groupJoinSuccess(action));
            }).catch((err) => {
                dispatch(groupJoinFailed(err));
            })
        }
    }
}

const searchGroupMemberRequest = createAction(ActionType.SEARCH_GROUP_MEMBER_REQUEST);
const searchGroupMemberSuccess = createAction(ActionType.SEARCH_GROUP_MEMBER_SUCCESS);
const searchGroupMemberFailed = createAction(ActionType.SEARCH_GROUP_MEMBER_FAILED);

export const searchMembers = (GROUP_KEY, SEARCH_KEWORD) => {
    return (dispatch, getState) => {

        dispatch(searchGroupMemberRequest())
        
        axios.get(`http://127.0.0.1:8000/group/members?groupKey=${GROUP_KEY}&searchMemberKeword=${SEARCH_KEWORD}`).then((members) => {
                
                console.log(members)
                dispatch(searchGroupMemberSuccess(members.data));
            }).catch((err) => {
                dispatch(searchGroupMemberFailed(err));
            })
        }
    }

