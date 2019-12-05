import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    joinedGroup : [],
    error : null
}

export default handleActions({
    [type.GET_JOINED_GROUP_SUCCESS] : (state,action) => Object.assign({},state, {joinedGroup : action.payload}),
}, initialState)