import React, { Component, Fragment } from 'react'
import { Form, Button, Image, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteGroupArticle } from '../../Store/ACTIONS/Group';
// import UpdateEditor from './ArticleUpdateForm';
// import styled from 'styled-components';
import GroupUpdateArticle from './groupArticleUpdateEditor';

import { postComment, postReComment } from '../../Store/ACTIONS/Comment.js';
import { deleteArticle, updateComment, deleteComment } from '../../Store/ACTIONS/Article';


class ArticleCard extends Component {

  static defaultProps = {
    writer: "dummy writer",
    contents: "contents",
    date: "2019-09-01",
    comment: [],
  }

  state = {
    COMMENT: "",
    MODE: "수정",
    COMMENT_SHOW: false
  }

  onChangeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  setMode = () => {
    if (this.state.MODE === "수정") {
      this.setState({
        MODE: "되돌리기"
      })
    } else {
      this.setState({
        MODE: "수정"
      })
    }
  }



  deleteArticle = () => {
    const { match, rowId } = this.props;
    this.props.deleteGroupArticle(rowId, match.where);
  }
  render() {
    const src = this.props.profile_image ? this.props.profile_image : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
    const manageButton = this.props.user === this.props.writer ? <Fragment>
      <label className="articleManageFunctions" style={{'color' : 'white'}}onClick={this.setMode}>{this.state.MODE}</label>
      <label  className="articleManageFunctions" style={{'color' : 'white'}} onClick={this.deleteArticle}>삭제</label>
    </Fragment> : null;
    const modeStyle = this.props.secret === 0 ? {
      'backgroundColor': 'gray'
    } : {
        'backgroundColor': 'gray'
      };
      console.log(this.props)
    return (
      <div>
        <div className="articleCard" style={modeStyle}>
        <div className="articleCardHeader">
                <div className="articleUserImageDiv">
                  <Image id="articleProfileImage" size="mini" src={src}></Image>
                </div>
                <div className="articleCardInfo">
                  <div>
                    {this.props.writer}{manageButton}
                  </div>
                  <label id="groupAticleDate">{this.props.date}</label>
                </div>
              </div>
          {this.state.MODE === "수정" ?
            <Fragment>
              <div className="articleImageDiv" id="forGroupArticleDiv">
                <div className="articleImageSections" >
                  <Image src={this.props.image !== "null"? this.props.image : null} size="medium" style={{ 'display': 'inlineBlock' }}></Image>
                </div>
                <div className="articleSection" id="forGroupArticlePost">
                  <div>
                    {this.props.article}
                  </div>
                </div>
              </div>
            </Fragment> : <GroupUpdateArticle
              where={this.props.match.where}
              postKey={this.props.rowId}
              image={this.props.image}
              comment={this.props.article}
              writer={this.props.writer}
              setMode={this.setMode}></GroupUpdateArticle>}
        </div>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    postComment: bindActionCreators(postComment, dispatch),
    postRecomment: bindActionCreators(postReComment, dispatch),
    deleteGroupArticle: bindActionCreators(deleteGroupArticle, dispatch),
    updateComment: bindActionCreators(updateComment, dispatch),
    deleteComment: bindActionCreators(deleteComment, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ArticleCard); 