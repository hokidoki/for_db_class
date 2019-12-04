import { combineReducers } from 'redux';
import createGroup from './CREATE_GROUP'
import adminGroup from './ADMIN_GROUP'
import searchGroupMembers from './SEARCH_GROUP_MEMBER'
export default combineReducers({
    adminGroup,
    createGroup,
    searchGroupMembers
})
