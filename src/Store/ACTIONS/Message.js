import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'

const sendMessageRequest = createAction(ActionType.SEND_MESSAGE_REQUEST);
const sendMessageSuccess = createAction(ActionType.SEND_MESSAGE_SUCCESS);
const sendMessageFailed = createAction(ActionType.SEND_MESSAGE_FAILED);

export const sendMessage = (who, message) =>{
    return (dispatch,getState) =>{
        dispatch(sendMessageRequest());

        const user= getState().USER.sign_in.user.ID;
        axios.post('https://www.hokeys.com:431/message',{
            from : user,
            to : who,
            message : message
        }).then(()=>{
            dispatch(sendMessageSuccess());
            dispatch(getMessage(who))
        }).catch((err)=>{
            dispatch(sendMessageFailed(err));  
        })
    }
}

const getMessageRequest = createAction(ActionType.GET_MESSAGE_REQUEST);
const getMessageSuccess = createAction(ActionType.GET_MESSAGE_SUCCESS);
const getMessageFailed = createAction(ActionType.GET_MESSAGE_FAILED);

export const getMessage = (who) => {
    return (dispatch,getState) => {
        dispatch(getMessageRequest());
        const user= getState().USER.sign_in.user.ID;
        axios.get(`https://www.hokeys.com:431/message?user=${user}&talkwith=${who}`).then((conversation)=>{
            dispatch(getMessageSuccess(conversation.data));
        }).catch((err)=>{
            dispatch(getMessageFailed(err));    
        })
    }
}

const getGroupMessageRequest = createAction(ActionType.GET_GROUP_MESSAGE_REQUEST);
const getGroupMessageSuccess = createAction(ActionType.GET_GROUP_MESSAGE_SUCCESS);
const getGroupMessageFailed = createAction(ActionType.GET_GROUP_MESSAGE_FAILED);

export const getGroupMessage = (where) => {
    return (dispatch,getState) => {
        dispatch(getGroupMessageRequest());
        axios.get(`https://www.hokeys.com:431/group/message?where=${where}`).then((conversation)=>{
            dispatch(getGroupMessageSuccess(conversation.data));
        }).catch((err)=>{
            dispatch(getGroupMessageFailed(err));    
        })
    }
}

export const sendGroupMessage = (where,message,user) => {
    return (dispatch,getState) => {
        axios.post(`https://www.hokeys.com:431/group/message`,{
            from : user,
            group_key : where,
            message : message
        }).then((conversation)=>{
            // dispatch(getGroupMessageSuccess(conversation.data));
            dispatch(getGroupMessage(where));
        }).catch((err)=>{
            // dispatch(getGroupMessageFailed(err));    
        })
    }
}
