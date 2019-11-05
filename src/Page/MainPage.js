import React, { Component } from 'react'

import GroupNoticePage from './GroupNoticePage'
import ArticlePage from './ArticlePage'
import FriendsListPage from './FriendsListPage';

import '../style/main.css';
import { connect } from 'react-redux';


class MainPage extends Component {
    render() {
        return (
            <div className="MainPage">
                <GroupNoticePage USER={this.props.USER}></GroupNoticePage>
                <FriendsListPage user={this.props.USER}></FriendsListPage>
                <ArticlePage></ArticlePage>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in
    }
  }
  
  export default connect(mapStateToProps,null)(MainPage);