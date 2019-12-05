import { combineReducers } from 'redux';
import createGroup from './CREATE_GROUP'
import adminGroup from './ADMIN_GROUP'
import searchGroupMembers from './SEARCH_GROUP_MEMBER'
import joinedGroup from './GET_JOINED_GROUP';
import groupArticle from './GROUP_ARTICLE';
export default combineReducers({
    adminGroup,
    createGroup,
    searchGroupMembers,
    joinedGroup,
    groupArticle
})
