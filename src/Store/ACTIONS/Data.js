import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'

export const publicDataReset = createAction(ActionType.RESET_PUBLIC_DATA);
export const getPublicData = createAction(ActionType.GET_PUBLIC_DATA);

export const getData = (keword) =>{
    return (dispatch) =>{
        axios.get(`https://www.hokeys.com:431/data?addressKeyword=${keword}`).then((result)=>{
            dispatch(getPublicData(result.data))
        })
    }
}