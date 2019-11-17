import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    groupInfo : [],
    error : null
}

export default handleActions({
    [type.GET_ADMIN_GROUP_SUCCESS] : (state,action) => Object.assign({},state, {groupInfo : action.payload.data}),
    [type.GET_NEW_ADMIN_GROUP_SUCCESS] : (state,action) => Object.assign({},state, {groupInfo : state.groupInfo.push(action.payload)}),
}, initialState)