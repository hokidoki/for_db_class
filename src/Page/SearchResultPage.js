import React, { Component } from 'react'
import {connect} from 'react-redux';
import SearchResult from '../Component/SearchComponent/SearchResult';
import '../style/searchCard.css';

class SearchResultPage extends Component {
    render() {
        console.log(this.props)
        const card = this.props.SearchResult? this.props.SearchResult.map((item,index)=>{
            const {NAME, ID,COMMENT,CHECK,ROW_ID,isLoading} = item;
            
            return <SearchResult name={NAME} id={ID} rowId={ROW_ID} comment={COMMENT} isLoading={isLoading} index={index} check={CHECK}></SearchResult>
        }) : null;  
        const groupCard = this.props.GroupResult? this.props.GroupResult.map((item,index)=>{
            const {group_id,group_name,group_master,group_comment,created_at,isLoading} = item;
            const {user} = this.props;
            return <SearchResult user={user} group_master={group_master} name={group_name} id={group_id} created_at={created_at} mode="groupCard" rowId={group_id} comment={group_comment} isLoading={isLoading} index={index} ></SearchResult>
        }) : null;  
        return (
            <div className='FriendsListPage'>
                <h2>사람</h2>
                {card}
                <h2>그룹</h2>
                {groupCard}
            </div>
        )
    }
}

const getStateToProps = (state)=>{
    return {
        SearchResult : state.SEARCH.search.result,
        GroupResult : state.SEARCH.search.group,
        user : state.USER.sign_in.user.ID
    }
}

export default connect(getStateToProps,null)(SearchResultPage)