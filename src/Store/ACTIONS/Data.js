import * as ActionType from'../ACTIONS/ActionType';
import axios from 'axios';
import { createAction } from 'redux-actions'

export const publicDataReset = createAction(ActionType.RESET_PUBLIC_DATA);
export const getPublicData = createAction(ActionType.GET_PUBLIC_DATA);

export const getData = (keword) =>{
    console.log("12")
    console.log(keword)
    return (dispatch) =>{
        axios.get(`http://127.0.0.1:8000/data?addressKeyword=${keword}`).then((result)=>{
            dispatch(getPublicData(result.data))
            console.log("hi")
        })
    }
}