import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../Store/ACTIONS/Account';
import {bindActionCreators} from 'redux';

class LoginComponent extends Component {

    state = {
        ID : "",
        PASSWORD : ""
    }
    onChangeValue = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    signIn =()=>{
        const {ID,PASSWORD} = this.state;

        if(ID.length < 4){
            alert("id는 4자리 이상입니다.");
            return;
        }
        if(PASSWORD.length < 4){
            alert("id는 4자리 이상입니다.");
            return;
        }

        this.props.signIn(ID,PASSWORD);
    }
    render() {
        const {ID, PASSWORD} = this.state;
        return (
            <div className="loginBox">
                <input placeholder="ID" name="ID" value={ID} onChange={this.onChangeValue} className="loginTextBox" maxLength="15" ></input>
                <input placeholder="PASSWORD" name="PASSWORD" value={PASSWORD} onChange={this.onChangeValue} className="loginTextBox" maxLength="15" ></input>
                <button onClick={this.signIn}className="loginButton">로그인</button>
            </div>
        )
    }
}

const mapDispachToProps = (dispatch)=>{
    return{
        signIn : bindActionCreators(signIn,dispatch)
    }
}
export default connect(null,mapDispachToProps)(LoginComponent)