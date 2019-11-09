import React, { Component } from 'react'
import GroupList from '../Component/GroupList'
import Notice from '../Component/Notice'
import Myinfo from '../Component/MyInfo'

export default class GroupNoticePage extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="GroupNoticePage">
                <Myinfo user={this.props.USER.user}></Myinfo>
                <GroupList></GroupList>
                <Notice></Notice>
            </div>
        )
    }
}
