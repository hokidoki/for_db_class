import { handleActions } from 'redux-actions';
import * as type from '../ACTIONS/ActionType';
import * as moment from 'moment';

const initialState = {
    getPublic :[],
    isLoading : false,
    err : false
}

export default handleActions({
    [type.GET_PUBLIC_DATA] : (state,action) =>Object.assign({},state,{getPublic :action.payload}),
    [type.RESET_PUBLIC_DATA] : (state,action) => Object.assign({},state, {getPublic : []}),
}, initialState)