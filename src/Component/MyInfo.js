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

    myinfo = () =>{
        this.props.goToInfo()
    }

    render() {
        const src = this.props.user.PROFILE_IMAGE ? this.props.user.PROFILE_IMAGE : 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg';
        return (
            <div className="myInfo">
                <p>
                    {this.props.user.GENDER ?
                        <Image
                            className ="userIcon"
                            size='mini'
                            src={src}
                        /> : <Image
                            className ="userIcon"
                            size='mini'
                            src={src}
                        />}
                    {this.props.user.NAME} 님 환영합니다.
                </p>
                <button className="myInfoButton" onClick={this.myinfo}>내 정보</button>
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
        },
        goToInfo : ()=>{
            dispatch(push('/main/myinfo'))
        }
    }
}

export default connect(null, mapDispatchToProps)(MyInfo);