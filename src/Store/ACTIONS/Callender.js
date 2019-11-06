import * as ActionType from'../ACTIONS/ActionType';
// import axios from 'axios';
import { createAction } from 'redux-actions'
// import { push } from 'connected-react-router'

// export const getSelectedArticleRequest = createAction(ActionType.GET_SELECTED_ARTICLE_REQUEST);
// export const getSelectedArticleSuccess = createAction(ActionType.GET_SELECTED_ARTICLE_SUCCESS);
// export const getSelectedArticleFailed = createAction(ActionType.GET_SELECTED_ARTICLE_FAILED);

// export const getSelectedDateArticle = (ID,DATE)=>{ 
//     return (dispatch, getState) =>{
//         dispatch(getSelectedArticleRequest());

//         axios.get(`http://59.23.123.73:3000/getSelectedDateArticle/?ID=${ID};DATE=${DATE}`).then((result)=>{
//             dispatch(getSelectedArticleSuccess(result));
//         }).catch((err)=>{
//             dispatch(GET_SELECTED_ARTICLE_FAILED(err));
//         })
//     }
// }
export const changeSelectDate = createAction(ActionType.CHANGE_SELECT_DATE);
