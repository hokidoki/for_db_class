import * as ActionType from '../ACTIONS/ActionType';
import axios from 'axios';
import {createAction} from 'redux-actions'
import { push } from 'connected-react-router'
import {getStoreImageUrl} from '../../API/firebase';
import {getAdminGroupSuccess,getJoinedGroupSuccess} from './Group';

const signUpRequest = createAction(ActionType.SIGN_UP_REQUEST);
const signUpSuccess = createAction(ActionType.SIGN_UP_SUCCESS);
const signUpFailed = createAction(ActionType.SIGN_UP_FAILED);
export const logOut = createAction(ActionType.LOGOUT);


export const signUp = (ID, PASSWORD, NAME, BIRTH, JOB, CURRENTWEIGHT, GOALWEIGHT, COMMENT, GENDER) => {
    return (dispatch, getState) => {
        // const dateType = BIRTH.substr(0,4)+'-'+BIRTH.substr(4,2)+'-'+BIRTH.substr(6,2);
        // console.log()
        dispatch(signUpRequest());

        axios.post('http://121.150.186.143:8000/signup', {
            ID: ID,
            PASSWORD: PASSWORD,
            NAME: NAME,
            JOB: JOB,
            CURRENT_WEIGHT: CURRENTWEIGHT,
            BIRTH: BIRTH,
            GOAL_WEIGHT: GOALWEIGHT,
            COMMENT: COMMENT,
            GENDER: GENDER
        }).then((result) => {
            dispatch(signUpSuccess());
            dispatch(signIn(ID,PASSWORD))
            // dispatch(signInSuccess(result.data[0]));
            console.log(result)
            dispatch(push('/main'));
        }).catch((err) => {
            dispatch(signUpFailed());
        })
    }
}

const signInSuccess = createAction(ActionType.SIGN_IN_SUCCESS);
const signInRequest = createAction(ActionType.SIGN_IN_REQUEST);
const signInFailed = createAction(ActionType.SIGN_IN_FAILED);
export const signIn = (ID, PASSWORD) => {
    return (dispatch) => {
        dispatch(signInRequest())
        axios.post('http://121.150.186.143:8000/user/signin', {
            ID: ID,
            PASSWORD: PASSWORD
        }).then((result) => {
            if (result.data[0]) {
                dispatch(signInSuccess(result.data[0]));
                dispatch(push('/main'));
                dispatch(getAdminGroupSuccess({
                    data: result.data[0].manageGroup
                }))
                dispatch(getJoinedGroupSuccess(result.data[0].joinedGroup))
            } else {
                dispatch(signInFailed(result));
                alert("ID혹은 비밀번호가 틀렸습니다.");
            }
        }).catch((err) => {
            dispatch(signInFailed(err));
            alert("ID혹은 비밀번호가 틀렸습니다.");
        })
    }
}

const friendRequestRequest = createAction(ActionType.FRIEND_REQUEST_REQUEST);
const friendRequestSuccess = createAction(ActionType.FRIEND_REQUEST_SUCCESS);
const friendRequestFailed = createAction(ActionType.FRIEND_REQUEST_FAILED);

export const friendRequest = (FRIEND_REQUEST_ID, ROW_ID, FRIEND_STATE, index) => {
    return (dispatch, getState) => {

        const userId = getState().USER.sign_in.user.ID;
        dispatch(friendRequestRequest(index))


        if (!ROW_ID) {
            axios.post('http://121.150.186.143:8000/friendRequest', {
                USER_ID: userId,
                FRIEND_REQUEST_ID: FRIEND_REQUEST_ID
            }).then((result) => {
                var action = {
                    index: index,
                    CHECK: true,
                    ROW_ID: result.data,
                }
                dispatch(friendRequestSuccess(action));
            }).catch((err) => {
                dispatch(friendRequestFailed(err));
            })
        } else {
            axios.put('http://121.150.186.143:8000/friendRequest', {
                ROW_ID: ROW_ID,
                REQUEST_CHECK_STATE: !FRIEND_STATE
            }).then(() => {
                var action = {
                    index: index,
                    CHECK: !FRIEND_STATE,
                    ROW_ID: ROW_ID,
                }
                dispatch(friendRequestSuccess(action));
            }).catch((err) => {
                dispatch(friendRequestFailed(err));
            })
        }
    }
}
const change_info = createAction(ActionType.CHANGE_INFO);

export const changeInfo = (nick, job, currentWeight, goalWeight, comment, propsImage, stateImage) => {
    return (dispatch, getState) => {
        const defaultSrc = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
        const userId = getState().USER.sign_in.user.ID;
        dispatch(signInRequest());
        let imageState = 'default';
        alert(propsImage)
        if (propsImage !== stateImage.src && propsImage !==null) {
            imageState = "update";
        }
        if (stateImage.src === defaultSrc) {
            imageState = "delete";
        } 
        if (propsImage ===null && stateImage.src !== defaultSrc) {
            imageState = "new";
        }
        if (imageState === "update" || imageState === "new") {
            getStoreImageUrl(stateImage).then((imageSrc) => {
                axios.put(`http://121.150.186.143:8000/user?imageState=${imageState}`, {
                    userId: userId,
                    nick: nick,
                    job: job,
                    currentWeight: currentWeight,
                    goalWeight : goalWeight,
                    comment: comment,
                    profileImageSrc: imageSrc
                }).then((result) => {
                    console.log(result.data[0])
                    dispatch(change_info(result.data[0]));
                })
            })
        } else {
            let imageSrc = null;
            axios.put(`http://121.150.186.143:8000/user?imageState=${imageState}`, {
                userId: userId,
                nick: nick,
                job: job,
                currentWeight: currentWeight,
                goalWeight : goalWeight,
                comment: comment, 
                profileImageSrc: imageSrc
            }).then((result) => {
                dispatch(change_info(result.data[0]));
            })
        }
    }
}

const getWhoFollowMeSucces = createAction(ActionType.GET_WHO_FOLLOW_ME_SUCCESS);

export const getWhoFollowMe =() =>{
    return (dispatch,getState) =>{
        const userId = getState().USER.sign_in.user.ID;
        axios.get(`http://121.150.186.143:8000/user/whoFollowMe?userId=${userId}`).then((peoples)=>{
            console.log(peoples);
            dispatch(getWhoFollowMeSucces(peoples.data));
        }).catch((err)=>{
            // alert(err)
        })
    }
}