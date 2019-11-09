import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { push } from 'connected-react-router';


const postArticleRequest = createAction(ActionType.SEARCH_REQUEST);
const postArticleSuccess = createAction(ActionType.SEARCH_SUCCESS);
const postArticleFailed = createAction(ActionType.SEARCH_FAILED);

export const search = (searchKeword) =>{
    return (dispatch, getState) =>{
        const user = getState().USER.sign_in.user.ID;
        dispatch(postArticleRequest());
        axios.get(`http://127.0.0.1:8000/search?USER=${user}&SEARCH_KEWORD=${searchKeword}`
        ).then((result)=>{
            console.log(result);
            for(var i = 0; i < result.data.length; i++){
                result.data[i].isLoading = false;
            }
            dispatch(postArticleSuccess(result.data));
            dispatch(push('/main/search'));
        }).catch((err)=>{
            dispatch(postArticleFailed(err));
        })
    }
}