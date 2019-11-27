import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import {getStoreImageUrl} from '../../API/firebase';

const postArticleRequest = createAction(ActionType.POST_ARTICLE_REQUEST);
const postArticleSuccess = createAction(ActionType.POST_ARTICLE_SUCCESS);
const postArticleFailed = createAction(ActionType.POST_ARTICLE_FAILED);

export const postArticle = (MORNING, LUNCH, DINNER, COMMENT,IMAGE) =>{
    return (dispatch, getState) =>{
        const writer = getState().USER.sign_in.user.ID;
        const selectedDate = getState().CALLENDER.selected.selected;
        const dateType = selectedDate.format('YYYY[-]MM[-]DD');
        dispatch(postArticleRequest());
        if(IMAGE){
            getStoreImageUrl(IMAGE).then((url)=>{
                axios.post('http://127.0.0.1:8000/article',{
                    WRITER : writer,
                    DATE : dateType,
                    MORNING : MORNING,
                    LUNCH : LUNCH,
                    DINNER : DINNER,
                    COMMENT : COMMENT,
                    IMAGE_URL : url
                    }).then((result)=>{
                        axios.get(`http://127.0.0.1:8000/article?mod=updatedArticle&articleRowId=${result.data}`).then((article)=>{
                            dispatch(postArticleSuccess(article.data[0]));
                        })
                    }).catch((err)=>{
                        dispatch(postArticleFailed());
                    })
            });            
        }else{
            axios.post('http://127.0.0.1:8000/article',{
                WRITER : writer,
                DATE : dateType,
                MORNING : MORNING,
                LUNCH : LUNCH,
                DINNER : DINNER,
                COMMENT : COMMENT,
                }).then((result)=>{
                    axios.get(`http://127.0.0.1:8000/article?mod=updatedArticle&articleRowId=${result.data}`).then((article)=>{
                        dispatch(postArticleSuccess(article.data[0]));
                    })
                }).catch((err)=>{
                    dispatch(postArticleFailed());
                })
        }
    }
}

const getArticleThisMonthRequest = createAction(ActionType.GET_ARTICLE_THIS_MONTH_REQUEST);
const getArticleThisMonthSuccess = createAction(ActionType.GET_ARTICLE_THIS_MONTH_SUCCESS);
const getArticleThisMonthFailed = createAction(ActionType.GET_ARTICLE_THIS_MONTH_FAILED);


export const getArticleThisMonth = (ID) =>{
    return (dispatch,getState) => {
        dispatch(getArticleThisMonthRequest());
        const firstDateOfthisMonth = (getState().CALLENDER.selected.selected.clone().startOf('month')).clone().format('YYYY[-]MM[-]DD');
        const lastDateOfThisMonth = (getState().CALLENDER.selected.selected.clone().endOf('month')).clone().format('YYYY[-]MM[-]DD');
        console.log(firstDateOfthisMonth);
        console.log(lastDateOfThisMonth);
        axios.get(`http://127.0.0.1:8000/article?ID=${ID}&FIRST_DATE=${firstDateOfthisMonth}&LAST_DATE=${lastDateOfThisMonth}`).then((result)=>{
            dispatch(getArticleThisMonthSuccess({
                userId : ID,
                article : result
            }));
        }).catch((err)=>{
            dispatch(getArticleThisMonthFailed(err));
        })

    }
}

const getArticleRequest = createAction(ActionType.GET_ARTICLE_REQUEST);
const getArticleSuccess = createAction(ActionType.GET_ARTICLE_SUCCESS);
const getArticleFailed = createAction(ActionType.GET_ARTICLE_FAILED);
export const getArticleReset = createAction(ActionType.GET_ARTICLE_RESET);

//나중을 위한 분리.
const getCommentSuccess = createAction(ActionType.GET_COMMENT_SUCCESS);
const getCommentFailed = createAction(ActionType.GET_COMMENT_FAILED);


export const getArticle = () =>{
    return (dispatch, getState)=>{
        const friends = getState().USER.sign_in.user.friends;
        const userId = getState().USER.sign_in.user.ID;
        const friendsJson = JSON.stringify(friends);
        dispatch(getArticleRequest());

            axios.get(`http://127.0.0.1:8000/article?mod=full&userId=${userId}&friends=${friendsJson}`).then((article)=>{
                dispatch(getArticleSuccess(article));

                const comment = article.data.map((article)=>{
                    return article.comment;
                })

                dispatch(getCommentSuccess(comment));
            }).catch((err)=>{
                dispatch(getArticleFailed(err));
                dispatch(getCommentFailed(err));
            })
    }
}
const getUpdatedArticleSuccess= createAction(ActionType.GET_UPDATED_ARTICLE);
const getUpdatedCommentSuccess = createAction(ActionType.GET_UPDATED_COMMENT);

export const updatedArticle = (articleRowId,index,setMode) =>{
    return (dispatch,getState)=>{
    
        axios.get(`http://127.0.0.1:8000/article?mod=updatedArticle&articleRowId=${articleRowId}`).then((result)=>{
        dispatch(getUpdatedArticleSuccess({
            index : index,
            updatedArticle : result.data[0]
        }))    
        console.log(result)
        const comment = result.data[0].comment;
        dispatch(getUpdatedCommentSuccess({
            index : index,
            updatedComment : comment
        }))
        })
        if(setMode !== null){
            setMode();
        }
    }
}

// const putPrivateUpdateArticleRequest = createAction(ActionType.UPDATE_PRIVATE_ARTICLE_REQUEST);
// const putPrivateUpdateArticleSuccess = createAction(ActionType.UPDATE_PRIVATE_ARTICLE_SUCCESS);
// const putPrivateUpdateArticleFailed = createAction(ActionType.UPDATE_PRIVATE_ARTICLE_FAILED);

export const putUpdateArticle = (articleRowId,preventImage,nextImage,breakFast,lunch,dinner,comment,index,setMode)=>{
    return (dispatch,getState)=>{
        let writer = getState().USER.sign_in.user.ID;
        let imageState = "default";
        if(preventImage && !nextImage){
            imageState= "delete";
        } else if(preventImage &&  preventImage !== nextImage.src && nextImage.src){
            imageState = "update";
        }else if(!preventImage && nextImage.src){
            imageState = "new";
        }
        console.log(index)

        if(imageState === "update" || imageState === "new" ){
            getStoreImageUrl(nextImage).then((imageSrc)=>{
                axios.put(`http://127.0.0.1:8000/article/privateArticle?imageState=${imageState}`,{
                    articleRowId : articleRowId,
                    writer : writer,
                    breakFast : breakFast,
                    lunch : lunch,
                    dinner : dinner,
                    comment : comment,
                    image : {
                        image : imageSrc,
                    }
                }).then((result)=>{
                    dispatch(updatedArticle(articleRowId,index,setMode));
                })
            })
        }else{
            axios.put(`http://127.0.0.1:8000/article/privateArticle?imageState=${imageState}`,{
                    articleRowId : articleRowId,
                    breakFast : breakFast,
                    writer : writer,
                    lunch : lunch,
                    dinner : dinner,
                    comment : comment,
                    image : {
                        image : preventImage,
                    }
            }).then((result)=>{
                dispatch(updatedArticle(articleRowId,index,setMode));
            })
        }
    }  
};

const deleteArticleSuccess = createAction(ActionType.DELETE_ARTICLE);

export const deleteArticle = (articleRowId,index)=>{
    return (dispatch,getState) =>{
        axios.delete(`http://127.0.0.1:8000/article/privateArticle`,{
            data : {
                articleRowId : articleRowId
            }
        }).then(()=>{
            dispatch(deleteArticleSuccess({
                index : index
            }));
        })
    }
}
