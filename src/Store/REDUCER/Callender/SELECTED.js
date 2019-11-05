import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    selectedDate: null,
    item : {},
}

export default handleActions({
    [type.SELECTED] : (state,action) => Object.assign({},state, {selected : action.payload}),
}, initialState)