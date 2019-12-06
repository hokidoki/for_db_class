import React, { Component } from 'react'
import FriendsList from '../Component/FriendsList'
import GroupList from '../Component/Group/groupList'
import { connect } from 'react-redux';
import '../style/frindsList.css'

class FriendsListPage extends Component {
    render() {
        return (
            <div className="FriendsListPage">
                <div className="FriendSideMenu">
                <FriendsList bothFollow={this.props.bothFollow}></FriendsList>
                <GroupList group={this.props.adminGroup}></GroupList>
                <GroupList group={this.props.joinedGroup}></GroupList>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        bothFollow : state.USER.sign_in.bothFollow,
        adminGroup : state.GROUP.adminGroup.groupInfo,
        joinedGroup : state.GROUP.joinedGroup.joinedGroup

    }
}


export default connect(mapStateToProps,null)(FriendsListPage);