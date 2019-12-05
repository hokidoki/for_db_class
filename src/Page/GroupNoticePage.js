import React, { Component } from 'react'
import GroupList from '../Component/GroupList'
import Myinfo from '../Component/MyInfo'

export default class GroupNoticePage extends Component {
    render() {
        return (
            <div className="GroupNoticePage">
                <Myinfo user={this.props.USER.user}></Myinfo>
                <GroupList></GroupList>
                {/* <Notice></Notice> */}
            </div>
        )
    }
}
