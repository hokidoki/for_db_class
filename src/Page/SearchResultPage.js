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
        return (
            <div className='FriendsListPage'>
                <h2>사람</h2>
                {card}
                <h2>그룹</h2>
            </div>
        )
    }
}

const getStateToProps = (state)=>{
    return {
        SearchResult : state.SEARCH.search.result
    }
}

export default connect(getStateToProps,null)(SearchResultPage)