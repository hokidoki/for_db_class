import React, { Component } from 'react'

import GroupNoticePage from './GroupNoticePage'
import ArticlePage from './ArticlePage'
import SearchResultPage from './SearchResultPage';
import MyinfoPage from './MyinfoPage';
import GroupAdminPage from './GroupAdminPage';

import FriendsListPage from './FriendsListPage';
import GroupPage from './GroupPage';
import DataPage from './DataPage';
// import FriendsListPage from './FriendsListPage';

import '../style/main.css';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';

class MainPage extends Component {
    render() {
        
        return (
            <div className="MainPage">
                
                <GroupNoticePage USER={this.props.USER}></GroupNoticePage>
                {/* <FriendsListPage user={this.props.USER}></FriendsListPage> */}
                <Switch>
                    <Route path="/main" exact component={ArticlePage}></Route>
                    <Route path="/main/search" exact component={SearchResultPage}/>
                    <Route path="/main/myinfo" exact component={MyinfoPage}/>
                    <Route path="/main/group/admin/:where/:index" component={GroupAdminPage}></Route>
                    <Route path="/main/group/:where" component={GroupPage}></Route>
                    <Route path="/main/publicdata" exact component={DataPage}/>
                </Switch>
                <FriendsListPage></FriendsListPage>
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