import { combineReducers } from 'redux';
import SendMessage from './SendMessage';
import GetMessage from './GetMessage';
import GetGroupMessage from './GetGroupMessage'
export default combineReducers({
    GetMessage,
    SendMessage,
    GetGroupMessage
})

