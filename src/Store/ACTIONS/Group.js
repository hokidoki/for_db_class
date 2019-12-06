import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { modal_close } from '../REDUCER/Modal';
import { getStoreImageUrl } from '../../API/firebase'
import {push} from 'connected-react-router'

const createGroupRequest = createAction(ActionType.CREATE_GROUP_REQUEST);
const createGroupSuccess = createAction(ActionType.CREATE_GROUP_SUCCESS);
const createGroupFailed = createAction(ActionType.CREATE_GROUP_FAILED);
export const getJoinedGroupSuccess = createAction(ActionType.GET_JOINED_GROUP_SUCCESS);
export const getAdminGroupSuccess = createAction(ActionType.GET_ADMIN_GROUP_SUCCESS);
// const getNewAdminGroupSuccess = createAction(ActionType.GET_NEW_ADMIN_GROUP_SUCCESS);
export const groupMemberReset = createAction(ActionType.GROUP_MEMBER_RESET);
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
            console.log(result)
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
                dispatch(getJoinedGroup());
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
                dispatch(getJoinedGroup());
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

export const changeMemberLevel = (group_member_id, level,GROUP_KEY,id)=>{
    return (dispatch) =>{
        
        axios.put(`http://127.0.0.1:8000/group/members`,{
            memberRowId : group_member_id,
            level : level
        }).then((members) => {
                console.log(members)
                dispatch(searchMembers(GROUP_KEY,id));
        })
    }
}

export const deleteGroup = (group_key) =>{
    return (dispatch,getState) =>{
        const userId = getState().USER.sign_in.user.ID;
        axios.delete('http://127.0.0.1:8000/group',{
            data : {
                group_key : group_key,
                userId : userId
            }
        }).then((result)=>{
            dispatch(getAdminGroupSuccess(result))
        })
    }
}

export const getJoinedGroup = () =>{
    return (dispatch,getState) =>{
        const userId = getState().USER.sign_in.user.ID;
        axios.get(`http://127.0.0.1:8000/group/join?userId=${userId}`).then((result)=>{
            console.log(result);
            dispatch(getJoinedGroupSuccess(result.data))
        })
    }
}
const getGroupArticleRequest = createAction(ActionType.GET_GROUP_ARTICLE_REQUEST);
const getGroupArticleSuccess = createAction(ActionType.GET_GROUP_ARTICLE_SUCCESS);
const getGroupArticlefailed = createAction(ActionType.GET_GROUP_ARTICLE_FAILED);


export const getGroupArticle = (GROUP_KEY) =>{
    return (dispatch, getState) =>{
        dispatch(getGroupArticleRequest());
        axios.get(`http://127.0.0.1:8000/group/article?where=${GROUP_KEY}`).then((result)=>{
            dispatch(getGroupArticleSuccess(result.data));
            dispatch(push(`/main/group/${GROUP_KEY}`));
        }).catch((err)=>{
            dispatch(getGroupArticlefailed(err));
        })
    }
}

// const postGroupArticleSuccess = createAction(ActionType.POST_GROUP_ARTICLE_SUCCESS);
export const postGroupArticle = (GROUP_KEY,ARTICLE,IMAGE) =>{
    return (dispatch, getState) =>{
        const writer = getState().USER.sign_in.user.ID;
        if(IMAGE){
            getStoreImageUrl(IMAGE).then((url)=>{
                alert(url)
                axios.post('http://127.0.0.1:8000/group/article',{
                    from : writer,
                    group_key : GROUP_KEY,
                    article : ARTICLE,
                    image_Url : url,
                    }).then((result)=>{
                        dispatch(getGroupArticle(GROUP_KEY))
                    }).catch((err)=>{
                        // dispatch(postArticleFailed());
                    })
            });            
        }else{
            axios.post('http://127.0.0.1:8000/group/article',{
                    from : writer,
                    group_key : GROUP_KEY,
                    article : ARTICLE,
                    image_Url : null,
                    }).then((result)=>{
                        dispatch(getGroupArticle(GROUP_KEY))
                    }).catch((err)=>{
                        // dispatch(postArticleFailed());
                })
        }
    }
}

export const deleteGroupArticle = (POST_KEY,group_key) =>{
    return (dispatch, getState) =>{
        axios.delete(`http://127.0.0.1:8000/group/article`,{
            data : {
                postKey : POST_KEY
            }
        }).then((result)=>{
            dispatch(getGroupArticle(group_key));
        }).catch((err)=>{
            dispatch(getGroupArticlefailed(err));
        })
    }
}


export const putGroupUpdateArticle = (postKey,group_key,preventImage,nextImage,article,setMode)=>{
    return (dispatch,getState)=>{
        let imageState = "default";
        if(preventImage && !nextImage){
            imageState= "delete";
        } else if(preventImage &&  preventImage !== nextImage.src && nextImage.src){
            imageState = "update";
        }else if(!preventImage && nextImage.src){
            imageState = "new";
        }
        alert(imageState)
        if(imageState === "update" || imageState === "new" ){
            getStoreImageUrl(nextImage).then((imageSrc)=>{
                axios.put(`http://127.0.0.1:8000/group/article`,{
                    postKey : postKey,
                    article : article,
                    image : {
                        image : imageSrc,
                    }
                }).then((result)=>{
                    dispatch(getGroupArticle(group_key))
                    setMode();
                })
            })
        }else{
                axios.put(`http://127.0.0.1:8000/group/article`,{
                    postKey : postKey,
                    article : article,
                    image : {
                        image : imageState ==="delete"? "delete" :nextImage,
                    }
                }).then((result)=>{
                    dispatch(getGroupArticle(group_key))
                    setMode();
        }
    )} 
}};