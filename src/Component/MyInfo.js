import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../Store/ACTIONS/Account';
import { push } from 'connected-react-router'

class MyInfo extends Component {
    static defaultProps = {
        name : "default"
    }
    
    logOut = ()=>{
        this.props.logout();
        this.props.back();
    }

    render() {
        console.log(this.props);
        return (
            <div className="myInfo">
                <p>
                {this.props.user.NAME} 님 환영합니다.
                </p>
                <button className="myInfoButton">내 정보</button>
                <button className="logoutButton" onClick={this.logOut}>로그아웃</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        logout : ()=> {
            dispatch(actions.logOut());
        },
        back : ()=>{
            dispatch(push('/'))
        }
    }
}

export default connect(null,mapDispatchToProps)(MyInfo);