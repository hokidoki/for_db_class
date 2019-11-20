import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import * as actions from '../Store/ACTIONS/Account';
import { push } from 'connected-react-router'

class MyInfo extends Component {
    static defaultProps = {
        name: "default"
    }

    logOut = () => {
        this.props.logout();
        this.props.back();
    }

    render() {
        return (
            <div className="myInfo">
                <p>
                    {this.props.user.GENDER ?
                        <Image
                            className ="userIcon"
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
                        /> : <Image
                            className ="userIcon"
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />}
                    {this.props.user.NAME} 님 환영합니다.
                </p>
                <button className="myInfoButton">내 정보</button>
                <button className="logoutButton" onClick={this.logOut}>로그아웃</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actions.logOut());
        },
        back: () => {
            dispatch(push('/'))
        }
    }
}

export default connect(null, mapDispatchToProps)(MyInfo);