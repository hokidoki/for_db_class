import React,{Component,Fragment} from 'react'
import { Form,Button,Image,TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateEditor from './ArticleUpdateForm';
// import styled from 'styled-components';

import {postComment,postReComment} from '../../Store/ACTIONS/Comment.js';
import {deleteArticle,updateComment,deleteComment} from '../../Store/ACTIONS/Article';


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
      return <Comment profile_image = {item.PROFILE_IMAGE}writer={item.WRITER} deleteComment={this.props.deleteComment} deleted={item.DELETED}updateComment={this.props.updateComment} articleRowId={this.props.articleRowId} articleIndex={this.props.index} user={this.props.user} createdAt={item.CERATED_AT} comment={item.COMMENT} addRecomment={this.addRecomment}comment_row_id={item.COMMENT_ROW_ID} DELETEAED={item.DELETEAED} recomment={item.recomment}></Comment>
      })
      const manageButton = this.props.user === this.props.id ? <Fragment>
            <label className="articleManageFunctions" onClick={this.setMode}>{this.state.MODE}</label>
            <label className="articleManageFunctions" onClick={this.deleteArticle}>삭제</label>
      </Fragment> : null;
      const modeStyle = this.props.secret === 0 ?{
        'backgroundColor' : '#1a1c22'
      } : {
        'backgroundColor' : '#324268'
      };
      const src = this.props.profile_image ? this.props.profile_image : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
      const style = this.props.deleted === true ? "deletedCard" : "articleCard";
        return(
          <div>
          <div className={style} style={modeStyle}>
            { this.state.MODE === "수정" ? 
            <Fragment>
            <div className="articleCardHeader">
              <div className="articleUserImageDiv">
              <Image id="articleProfileImage" size="mini" src={src}></Image>
              </div>
              <div className="articleCardInfo">
                <div>
                {this.props.writer}{!this.props.mode ? manageButton : null}
                </div>
              <label>{this.props.date}</label>
              </div>
            </div>
            <div className="articleImageDiv" id="articleImageDiv">
              <div className="articleImageSections">
              <Image src={this.props.image} size="medium" style={{'display' : 'inlineBlock'}}></Image>
              </div>
              <div className="articleSection">
                <div>아침 : {this.props.breakFast}</div>
                <div>점심 : {this.props.lunch}</div>
                <div>저녁 : {this.props.dinner}</div>
              <div>
                  {this.props.contents}
                </div>
              </div>
            </div>
            <div className="commentInputDiv">
            <Fragment>
              <div className="commentTextArea">
                <TextArea style={{ 'width' : '100%', 'maxHeight' : '100px','marginLeft' : '20px', 'marginTop' : '20px'}} onChange={this.onChangeValue} value={this.state.COMMENT} placeholder="Comment" className="articleInputComment" name="COMMENT"  placeholder='comment' />
              </div>
              <div className="commentButton">
                <Button style={{ 'height' : '80%' ,'marginLeft' : '20px'}} onClick={this.addComment} >등록</Button> 
              </div>
            </Fragment>
            </div>
            <div className="commentShowButton" onClick={this.commentShowStateChange}>
              {this.state.COMMENT_SHOW ? "댓글 가리기" : "댓글 펼치기"}
            </div>
            {/* {this.state.COMMENT_SHOW ? comment : null} */}
            </Fragment>: <UpdateEditor breakFast={this.props.breakFast} 
                                       articleRowId = {this.props.articleRowId}
                                       lunch={this.props.lunch} 
                                       dinner={this.props.dinner} 
                                       image={this.props.image} 
                                       comment={this.props.contents}
                                       writer={this.props.writer}
                                       index={this.props.index}
                                       date = {this.props.date}
                                       setMode = {this.setMode}
                                       src ={src}></UpdateEditor>} 
            </div>
            <div className="articleCommentContainer">
              {this.state.COMMENT_SHOW ? comment : null}
            </div>
          </div>
         
        )
    }
}



class Comment extends Component{

  constructor(props){
    super(props);
    this.state.updatedComment = this.props.comment;
  }

  static defaultProps = {
    writer : "dummy writer",
    comment : "삭제된 게시물입니다.",
    comment_row_id : "",
    createdAt : null,
  }

  state={
    reCommentInputShow : false,
    reComment : `[${this.props.writer}]님 `,
    updateMode : false
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

  setUpdateMode = ()=>{
    this.setState({
      reCommentInputShow : false,
      reComment : `[${this.props.writer}]님 `,
      updateMode : !this.state.updateMode
    })
  }

  updateComment = () =>{
    const {user, writer, updateComment,articleRowId,articleIndex,comment_row_id} = this.props;
    if(user !== writer) return;
    const where = "PRIVATE_ARTICLE_COMMENT";
    updateComment(articleRowId,articleIndex,where,comment_row_id,this.state.updatedComment,this.setUpdateMode);
  }

  deleteComment = () =>{
    const {user, writer, deleteComment,articleRowId,articleIndex,comment_row_id} = this.props;
    if(user !== writer) return;
    const where = "PRIVATE_ARTICLE_COMMENT";
    deleteComment(articleRowId,articleIndex,where,comment_row_id);
  }
  

  render(){
    console.log(this.props.deleted)
    const updateDelete = this.props.user === this.props.writer ? 
    <Fragment>
      <label className="commentFunction"onClick={this.setUpdateMode}>
          {this.state.updateMode ? "되돌리기" : "수정"}
      </label>
      <label className="commentFunction" onClick={this.deleteComment}>
          삭제
      </label>
      </Fragment>
      : null;

    const reComment = this.props.recomment.map((item)=>{
      const src = item.PROFILE_IMAGE ? item.PROFILE_IMAGE : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
      return (<div className="commentContainer">
        <div className="commentImage">
        <Image
          floated='left'
          size='mini'
          src={src}
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
          </div>
          <div className="comment">
              {item.COMMENT}
          </div>
        </div>
      </div>)
    }) 
    const {profile_image} = this.props;
    const src = profile_image ? profile_image : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
    return(
      <div className="commentContainer">
        <div className="commentImage">
          {
             this.props.deleted === 1? null : 
            <Image
          floated='left'
          size='mini'
          src={src}
        />
          }
        
        </div>
        <div className="commentInfoCommentContainer">
          <div className="commentInfo">
            <label>
              {this.props.writer}
            </label>
            <label>
              {this.props.createdAt}
            </label>
            {updateDelete}
            {
          this.state.updateMode ? 
          <div className="reCommentContainer">
              <div className="updateCommentDiv">
                  <TextArea className="reCommentTextArea" name ="updatedComment" value={this.state.updatedComment} onChange={this.onChange}></TextArea>
              </div>
              <div className="updateCommentButton">
                  <Button onClick={this.updateComment}>전송</Button>
              </div>
          </div> : this.props.deleted === 0 ? <label className="commentFunction" onClick={this.recommentShowStateChange}>
              답글
            </label> : null
        }
          </div>
        {
          this.state.updateMode ? 
          null : <div className="comment">
              {this.props.comment}
          </div>
        }
        </div>
        {
          this.state.reCommentInputShow ? 
          <div className="reCommentContainer rerecomment">
              <div className="updateCommentDiv">
                  <TextArea className="reCommentTextArea"name ="reComment" value={this.state.reComment} onChange={this.onChange}></TextArea>
              </div>
              <div className="updateCommentButton">
                  <Button onClick={this.addRecomment}>전송</Button>
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
    deleteArticle : bindActionCreators(deleteArticle,dispatch),
    updateComment : bindActionCreators(updateComment,dispatch),
    deleteComment : bindActionCreators(deleteComment,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(ArticleCard); 