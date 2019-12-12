import React, { Component } from 'react'
import Editor from '../Component/Group/groupEditor'
import GroupArticleCard from '../Component/Group/groupArticleCard'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {getArticle} from '../Store/ACTIONS/Article';
import {bindActionCreators} from 'redux';
import {getArticleReset} from '../Store/ACTIONS/Article';

class ArticlePage extends Component {

    componentWillUnmount(){
        this.props.reset();
    }
    static defaultProps ={
        ARTICLE : []
    }
    
    render() {
        const {ARTICLE,match} = this.props;
        const card = ARTICLE.map((item,index)=>{

            if(item.deleted){
                return <div className="articleCard">
                    삭제된 게시물입니다.
                </div>
            }else{
                return <GroupArticleCard
                    writer = {item.user_id}
                    article = {item.post}
                    date = {item.date}
                    rowId = {item.post_key}
                    image = {item.image_url}
                    user = {this.props.USER}
                    match = {match.params}
                >

                </GroupArticleCard>
            }
        })
        return (
            <div className="ArticlePage" style={{'overflowY' : 'auto'}}>
                <Editor match={match}></Editor>
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
        ARTICLE : state.GROUP.groupArticle.article,
        // COMMENT : state.ARTICLE.getComment.comment,
        USER : state.USER.sign_in.user.ID
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticlePage));