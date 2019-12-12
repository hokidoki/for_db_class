import React, { Component } from 'react'
import {connect} from 'react-redux';
import SearchResult from '../Component/SearchComponent/SearchResult';
import ArticleCard from '../Component/Article/ArticleCard';
import '../style/searchCard.css';

class SearchResultPage extends Component {
    state = {
        function : "user"
    }
    changeFuncion(mode){
        this.setState({
            function : mode
        })
    }
    render() {
        const card = this.props.SearchResult? this.props.SearchResult.map((item,index)=>{
            const {NAME, ID,COMMENT,CHECK,ROW_ID,isLoading} = item;
            
            return <SearchResult profile_image = {item.PROFILE_IMAGE} name={NAME} id={ID} rowId={ROW_ID} comment={COMMENT} isLoading={isLoading} index={index} check={CHECK}></SearchResult>
        }) : null;  
        const groupCard = this.props.GroupResult? this.props.GroupResult.map((item,index)=>{
            const {group_id,group_name,group_master,group_comment,created_at,isLoading,check,member_row_id} = item;
            const toggle = item.check === null || item.check === 0 || item.check === false? false : true;
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
            check ={toggle}></SearchResult>
        }) : null;  
        const articleCard = this.props.ArticleResult ? this.props.ArticleResult.map((item,index)=>{
            return <ArticleCard 
                profile_image = {item.PROFILE_IMAGE}
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
                secret ={0}
                ></ArticleCard>;
        }) : null;
       
        return (
            <div className='SearchResultPage'>
                <h2 className="searchFunctions" onClick={()=>{this.changeFuncion('user')}}>사람</h2>
                <h2 className="searchFunctions" onClick={()=>{this.changeFuncion('group')}}>그룹</h2>
                <h2 className="searchFunctions" onClick={()=>{this.changeFuncion('article')}}>게시물</h2>
                <div>
                    {this.state.function === 'user' ? card : 
                        this.state.function ==='group' ? groupCard :
                        this.state.function === 'article' ? articleCard : `검색에 실패하였습니다.`
                    }
                </div>
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