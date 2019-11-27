import React, { Component } from 'react'
import Editor from '../Component/callender/Editor'
import ArticleCard from '../Component/Article/ArticleCard';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {getArticle} from '../Store/ACTIONS/Article';
import {bindActionCreators} from 'redux';
import {getArticleReset} from '../Store/ACTIONS/Article';

class ArticlePage extends Component {
    componentDidMount(){
        this.props.getArticle();
    }

    componentWillUnmount(){
        this.props.reset();
    }
    static defaultProps ={
        ARTICLE : []
    }
    
    render() {
        const {ARTICLE, COMMENT,USER} = this.props;
        console.log(this.props)
        const card = ARTICLE.map((item,index)=>{

            if(item.deleted){
                return <div className="articleCard">
                    삭제된 게시물입니다.
                </div>
            }else{
                return <ArticleCard 
                user={USER}
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
                comment = {COMMENT[index]}
                index = {index}
                ></ArticleCard>
            }
        })
        return (
            <div className="FriendsListPage" style={{'overflowY' : 'auto'}}>
                <Editor></Editor>
                {card}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getArticle : bindActionCreators(getArticle,dispatch),
        reset : ()=> { dispatch(getArticleReset)}
    }
  }

const mapStateToProps = (state)=>{
    return {
        ARTICLE : state.ARTICLE.getArticle.article.data,
        COMMENT : state.ARTICLE.getComment.comment,
        USER : state.USER.sign_in.user.ID
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticlePage));