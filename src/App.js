import React, { Component } from 'react'
import MenuBar from './Component/MenuBar'
import IndexPage from './Page/IndexPage'
import MainPage from './Page/MainPage'
import { connect } from 'react-redux';

import {Switch, Route} from 'react-router-dom';
//
import './style/App.css'
import SearchResultPage from './Page/SearchResultPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar user={this.props.user}></MenuBar>
        {!this.props.user.user ? <IndexPage></IndexPage> : 
        <Switch>
          <Route path="/main" component={MainPage}></Route>
          <Route path="/search" component={SearchResultPage}></Route>
        </Switch>
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
      user : state.USER.sign_in
  }
}

export default connect(mapStateToProps,null)(App);
