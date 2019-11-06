import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { push } from 'connected-react-router'

const signUpRequest = createAction(ActionType.SIGN_UP_REQUEST);
const signUpSuccess = createAction(ActionType.SIGN_UP_SUCCESS);
const signUpFailed = createAction(ActionType.SIGN_UP_FAILED);
export const logOut = createAction(ActionType.LOGOUT);


export const signUp = (ID,PASSWORD,NAME,BIRTH,JOB,CURRENTWEIGHT,GOALWEIGHT,COMMENT) =>{
    return (dispatch,getState) =>{
        // const dateType = BIRTH.substr(0,4)+'-'+BIRTH.substr(4,2)+'-'+BIRTH.substr(6,2);
        // console.log()
        dispatch(signUpRequest());

        axios.post('http://127.0.0.1:8000/signup',{
            ID : ID,
            PASSWORD : PASSWORD,
            NAME : NAME,
            JOB : JOB,
            CURRENT_WEIGHT : CURRENTWEIGHT,
            BIRTH : BIRTH,
            GOAL_WEIGHT : GOALWEIGHT,
            COMMENT : COMMENT
        }).then((result)=>{
            dispatch(signUpSuccess());
            console.log(result);
            dispatch(signInSuccess(result.data[0]));
            dispatch(push('/main'));
        }).catch((err)=>{
            dispatch(signUpFailed());
        })
    }
}

const signInSuccess = createAction(ActionType.SIGN_IN_SUCCESS);
const signInRequest = createAction(ActionType.SIGN_IN_REQUEST);
const signInFailed = createAction(ActionType.SIGN_IN_FAILED);
export const signIn = (ID,PASSWORD)=>{
    return (dispatch)=>{
        dispatch(signInRequest())
        axios.post('http://127.0.0.1:8000/signin',{
            ID : ID,
            PASSWORD : PASSWORD
        }).then((result)=>{
            console.log(result)
            if(result.data[0]){
                dispatch(signInSuccess(result.data[0]));
                dispatch(push('/main'));
            }else{
                dispatch(signInFailed(result));
                alert("ID혹은 비밀번호가 틀렸습니다.");
            }
        }).catch((err)=>{
            dispatch(signInFailed(err));
            alert("ID혹은 비밀번호가 틀렸습니다.");
        })
    }
}

