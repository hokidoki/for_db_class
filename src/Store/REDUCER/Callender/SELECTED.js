import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';
import * as moment from 'moment';

const initialState = {
    selected: moment().startOf('day').add(1,'date'),
    item : {},
}

export default handleActions({
    [type.CHANGE_SELECT_DATE ] : (state,action) => Object.assign({},state, {selected : action.payload}),
}, initialState)