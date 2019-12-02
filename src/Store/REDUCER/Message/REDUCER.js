import { combineReducers } from 'redux';
import SendMessage from './SendMessage';
import GetMessage from './GetMessage';

export default combineReducers({
    GetMessage,
    SendMessage
})

