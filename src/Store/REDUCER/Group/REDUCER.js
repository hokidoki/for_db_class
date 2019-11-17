import { combineReducers } from 'redux';
import createGroup from './CREATE_GROUP'
import adminGroup from './ADMIN_GROUP'
export default combineReducers({
    adminGroup,
    createGroup
})
