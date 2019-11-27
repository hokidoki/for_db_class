import React,{Component,Fragment} from 'react'
import { Form,Button,Image,TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateEditor from './ArticleUpdateForm';
// import styled from 'styled-components';

import {postComment,postReComment} from '../../Store/ACTIONS/Comment.js';
import {deleteArticle} from '../../Store/ACTIONS/Article';


class ArticleCard extends Component {

    static defaultProps = {
        writer : "dummy writer",
        breakFast : "meal",
        lunch : "ham",
        dinner : "noodle",
        contents : "contents",
        date : "2019-09-01",
        image : "https://react.semantic-ui.com/images/avatar/large/matthew.png",
        comment : [],
    }

    state = {
      COMMENT : "",
      MODE : "수정",
      COMMENT_SHOW : false
    }

    onChangeValue = (e) =>{
      this.setState({
        [e.target.name] : e.target.value
      })
    }
    setMode = () =>{
      if(this.state.MODE === "수정"){
          this.setState({
            MODE : "되돌리기"
          })
      }else{
        this.setState({
          MODE : "수정"
        })
      }
    }

    commentShowStateChange = ()=>{
      this.setState({
        COMMENT : this.state.COMMENT,
        COMMENT_SHOW : !this.state.COMMENT_SHOW
      })
    }
    addComment = () =>{
      const {COMMENT} = this.state;
      const {articleRowId,index} =this.props;
      this.props.postComment(articleRowId,COMMENT,index);
    }

    addRecomment = (comment,forCommentId) =>{
      const {articleRowId,index} =this.props;
      this.props.postRecomment(articleRowId,forCommentId,comment,index);
    }

    deleteArticle = () => {
      const {articleRowId,index } = this.props;
      this.props.deleteArticle(articleRowId,index);
    }
    render(){
      const comment = this.props.comment.map((item)=>{
      return <Comment writer={item.WRITER}  createdAt={item.CREATED_AT} comment={item.COMMENT} addRecomment={this.addRecomment}comment_row_id={item.COMMENT_ROW_ID} DELETEAED={item.DELETEAED} recomment={item.recomment}></Comment>
      })
      const manageButton = this.props.user === this.props.id ? <Fragment>
            <label onClick={this.setMode}>{this.state.MODE}</label>
            <label onClick={this.deleteArticle}>삭제</label>
      </Fragment> : null;

        return(
          
          <div className="articleCard">
            {manageButton}
            { this.state.MODE === "수정" ? 
            <Fragment>
            <div>
              {this.props.writer}
              <label>{this.props.date}</label>
            </div>
            <div className="articleImageDiv">
              <Image src={this.props.image} size="medium" style={{'display' : 'inlineBlock'}}></Image>
              <div className="articleSection">
                <div>{this.props.breakFast}</div>
                <div>{this.props.lunch}</div>
                <div>{this.props.dinner}</div>
                <div>
                  {this.props.contents}
                </div>
              </div>
            </div>
            <div className="commentInputDiv">
            <Form>
                    <TextArea style={{ 'width' : '80%', 'maxHeight' : '100px','marginLeft' : '20px', 'marginTop' : '20px'}} onChange={this.onChangeValue} value={this.state.COMMENT} placeholder="Comment" className="articleInputComment" name="COMMENT"  placeholder='comment' />
                    <Button style={{ 'height' : '100%' ,'marginLeft' : '20px', 'marginTop' : '20px'}} onClick={this.addComment} >등록</Button>
            </Form>
            <div className="commentShowButton" onClick={this.commentShowStateChange}>
              {this.state.COMMENT_SHOW ? "댓글 가리기" : "댓글 펼치기"}
            </div>>
              {this.state.COMMENT_SHOW ? comment : null}
            </div>
            </Fragment>: <UpdateEditor breakFast={this.props.breakFast} 
                                       articleRowId = {this.props.articleRowId}
                                       lunch={this.props.lunch} 
                                       dinner={this.props.dinner} 
                                       image={this.props.image} 
                                       comment={this.props.contents}
                                       writer={this.props.writer}
                                       index={this.props.index}
                                       setMode = {this.setMode}></UpdateEditor>} 
          </div>
         
        )
    }
}



class Comment extends Component{

  static defaultProps = {
    writer : "dummy writer",
    comment : "contents",
    comment_row_id : "",
    createdAt : "2019-09-01",
  }

  state={
    reCommentInputShow : false,
    reComment : `[${this.props.writer}]님 `,
  }
  onChange = (e)=>{
    this.setState({
      reCommentInputShow : this.state.reCommentInputShow,
      [e.target.name] : e.target.value
    })
  }

  recommentShowStateChange= ()=>{
    this.setState({
      reCommentInputShow : !this.state.reCommentInputShow,
      reComment : this.state.reComment
    })
  }

  addRecomment =()=>{
    const {reComment} = this.state;
    const {comment_row_id} = this.props;
    this.props.addRecomment(reComment,comment_row_id)
  }

  
  

  render(){
    const reComment = this.props.recomment.map((item)=>{
      return (<div className="commentContainer">
        <div className="commentImage">
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        </div>
        <div className="commentInfoCommentContainer">
          <div className="commentInfo">
            <label>
              {item.WRITER}
            </label>
            <label>
              {item.DATE}
            </label>
            <label onClick={this.recommentShowStateChange}>
              답글
            </label>
          </div>
          <div className="comment">
              {item.COMMENT}
          </div>
        </div>
      </div>)
    }) 
    return(
      <div className="commentContainer">
        <div className="commentImage">
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        </div>
        <div className="commentInfoCommentContainer">
          <div className="commentInfo">
            <label>
              {this.props.writer}
            </label>
            <label>
              {this.props.createdAt}
            </label>
            <label onClick={this.recommentShowStateChange}>
              답글
            </label>
          </div>
          <div className="comment">
              {this.props.comment}
          </div>
        </div>
        {
          this.state.reCommentInputShow ? 
          <div className="reCommentContainer">
              <div>
                <Form>
                  <TextArea name ="reComment" value={this.state.reComment} onChange={this.onChange}></TextArea>
                  <Button onClick={this.addRecomment}>전송</Button>
                </Form>
              </div>
          </div> : null
        }
        {reComment}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    postComment: bindActionCreators(postComment,dispatch),
    postRecomment : bindActionCreators(postReComment,dispatch),
    deleteArticle : bindActionCreators(deleteArticle,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(ArticleCard); 