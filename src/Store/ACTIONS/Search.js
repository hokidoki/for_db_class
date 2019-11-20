import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'
import { push } from 'connected-react-router';


const searchRequest = createAction(ActionType.SEARCH_REQUEST);
const searchSuccess = createAction(ActionType.SEARCH_SUCCESS);
const searchFailed = createAction(ActionType.SEARCH_FAILED);

export const search = (searchKeword) =>{
    return (dispatch, getState) =>{
        const user = getState().USER.sign_in.user.ID;
        dispatch(searchRequest());
        axios.get(`http://127.0.0.1:8000/search?USER=${user}&SEARCH_KEWORD=${searchKeword}`
        ).then((result)=>{
            for(var i = 0; i < result.data.user.length; i++){
                result.data.user[i].isLoading = false;
            }
            for(var i = 0; i < result.data.group.length; i++){
                result.data.group[i].isLoading = false;
            }
            dispatch(searchSuccess(result));
            dispatch(push('/main/search'));
        }).catch((err)=>{
            dispatch(searchFailed(err));
        })
    }
}