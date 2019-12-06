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
        const src = this.props.user.PROFILE_IMAGE ? this.props.user.PROFILE_IMAGE : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
        return (
            <div>
            <div className="myInfo">
                    {this.props.user.GENDER ?
                        <Image
                            // style="userImage"
                            className="userImage"
                            // size='mini'
                            src={src}
                        /> : <Image
                        className="userImage"

                            // style="userImage"
                            // size='mini'
                            src={src}
                        />}
                    <h2 className="userNick">{this.props.user.NAME}</h2>
                </div>
                <div >
                <label className="myInfoButton" onClick={this.logOut}>로그아웃</label>
                <label className="myInfoButton" onClick={this.myinfo}>내 정보</label>   
                </div>
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