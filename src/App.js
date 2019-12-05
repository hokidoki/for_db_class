import React, { Component } from 'react'
import MenuBar from './Component/MenuBar'
import IndexPage from './Page/IndexPage'
import MainPage from './Page/MainPage'
import { connect } from 'react-redux';
import ModalPotal from './Component/modal';

import {Switch, Route} from 'react-router-dom';
import CreateGroup from './Component/Group/createGroup';
import MessageModal from './Component/messageModal';
import GroupMessageModal from './Component/groupMessageModal'
import './style/App.css'
import SearchResultPage from './Page/SearchResultPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.modal.modalIsOpen ? 
          <ModalPotal>
            {
              this.props.modal.mode === "createGroup" ? (<CreateGroup></CreateGroup>) : 
                this.props.modal.mode === "message" ? (<MessageModal user={this.props.user.user.ID} who={this.props.modal.who}></MessageModal>) :
                  this.props.modal.mode === "group_message" ? (<GroupMessageModal user={this.props.user.user.ID}where={this.props.modal.where}></GroupMessageModal>) : null
            }
          </ModalPotal> : null
        }
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
      modal : state.MODAL,
      user : state.USER.sign_in
  }
}

export default connect(mapStateToProps,null)(App);
