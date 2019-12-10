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
        axios.get(`https://www.hokeys.com:431/search?USER=${user}&SEARCH_KEWORD=${searchKeword}`
        ).then((result)=>{
            for(let ui = 0; ui < result.data.user.length; ui++){
                result.data.user[ui].isLoading = false;
            }
            for(let gi = 0; gi < result.data.group.length; gi++){
                result.data.group[gi].isLoading = false;
            }
            console.log(result)
            dispatch(searchSuccess(result));
            dispatch(push('/main/search'));
        }).catch((err)=>{
            dispatch(searchFailed(err));
        })
    }
}