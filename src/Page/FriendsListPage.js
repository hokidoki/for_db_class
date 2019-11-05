import React, { Component } from 'react'
import CallnederPage from './CallenderPage';

export default class FriendsListPage extends Component {
    render() {
        return (
            <div className="FriendsListPage">
                <CallnederPage user={this.props.user}></CallnederPage>
            </div>
        )
    }
}
