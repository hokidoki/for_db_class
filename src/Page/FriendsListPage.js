import React, { Component } from 'react'
import FriendsList from '../Component/FriendsList'
import { connect } from 'react-redux';
import '../style/frindsList.css'

class FriendsListPage extends Component {
    render() {
        return (
            <div className="FriendsListPage">
                <FriendsList friends={this.props.friends}></FriendsList>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        friends : state.USER.sign_in.friends
    }
}


export default connect(mapStateToProps,null)(FriendsListPage);