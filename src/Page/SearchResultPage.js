import React, { Component } from 'react'
import {connect} from 'react-redux';
import SearchResult from '../Component/SearchComponent/SearchResult';
import ArticleCard from '../Component/Article/ArticleCard';
import '../style/searchCard.css';

class SearchResultPage extends Component {
    render() {
        console.log(this.props)
        const card = this.props.SearchResult? this.props.SearchResult.map((item,index)=>{
            const {NAME, ID,COMMENT,CHECK,ROW_ID,isLoading} = item;
            
            return <SearchResult name={NAME} id={ID} rowId={ROW_ID} comment={COMMENT} isLoading={isLoading} index={index} check={CHECK}></SearchResult>
        }) : null;  
        const groupCard = this.props.GroupResult? this.props.GroupResult.map((item,index)=>{
            console.log(item);
            const {group_id,group_name,group_master,group_comment,created_at,isLoading,check,member_row_id} = item;
            const {user} = this.props;
            return <SearchResult user={user} 
            group_master={group_master} 
            name={group_name} id={group_id} 
            created_at={created_at} 
            mode="groupCard" 
            rowId={group_id} 
            comment={group_comment} 
            isLoading={isLoading} 
            index={index} 
            member_row_id ={member_row_id}
            check ={check}></SearchResult>
        }) : null;  
        const articleCard = this.props.ArticleResult ? this.props.ArticleResult.map((item,index)=>{
            return <ArticleCard 
                user={this.props.user}
                id={item.ID}
                writer={item.NAME} 
                breakFast={item.MORNING} 
                lunch={item.LUNCH}
                dinner={item.DINNER}
                contents={item.CONTENTS}
                date={item.CREATED_DATE}
                image={item.IMAGE_URL}
                imageRowId={item.IMAGE_ROW_ID}
                articleRowId={item.ARTICLE_ROW_ID}
                comment = {item.comment}
                index = {index}
                mode = "search"
                ></ArticleCard>;
        }) : null;
        return (
            <div className='SearchResultPage'>
                <h2>사람</h2>
                {card}
                <h2>그룹</h2>
                {groupCard}
                <h2>게시물</h2>
                {articleCard}
            </div>
        )
    }
}

const getStateToProps = (state)=>{
    return {
        SearchResult : state.SEARCH.search.result,
        GroupResult : state.SEARCH.search.group,
        ArticleResult : state.SEARCH.search.article,
        user : state.USER.sign_in.user.ID
    }
}

export default connect(getStateToProps,null)(SearchResultPage)