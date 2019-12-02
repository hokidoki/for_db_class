import React, { Component } from 'react'
import FriendsList from '../Component/FriendsList'
import { connect } from 'react-redux';
import '../style/frindsList.css'

class GroupAdminPage extends Component {
    render() {
        return (
            <div className="FriendsListPage">
                <FriendsList bothFollow={this.props.bothFollow}></FriendsList>
            </div>
        )
    }
}

// const mapStateToProps = (state)=>{
//     return {
//         bothFollow : state.USER.sign_in.bothFollow
//     }
// }


export default connect(null,null)(GroupAdminPage);