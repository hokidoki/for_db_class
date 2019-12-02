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
        axios.post('http://127.0.0.1:8000/message',{
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
        axios.get(`http://127.0.0.1:8000/message?user=${user}&talkwith=${who}`).then((conversation)=>{
            dispatch(getMessageSuccess(conversation.data));
        }).catch((err)=>{
            dispatch(getMessageFailed(err));    
        })
    }
}