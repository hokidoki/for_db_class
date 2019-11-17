import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { modal_close } from '../REDUCER/Modal';

const createGroupRequest = createAction(ActionType.CREATE_GROUP_REQUEST);
const createGroupSuccess = createAction(ActionType.CREATE_GROUP_SUCCESS);
const createGroupFailed = createAction(ActionType.CREATE_GROUP_FAILED);

const getAdminGroupSuccess = createAction(ActionType.GET_ADMIN_GROUP_SUCCESS);
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