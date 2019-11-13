import React, { Component } from 'react'
import { Button , Select} from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';
// import * as actionType from '../Store/ACTIONS/ActionType';
import { bindActionCreators } from 'redux';
import { signUp } from '../Store/ACTIONS/Account';

class AccountForm extends Component {

    state = {
        ID : "",
        NAME : "",
        PASSWORD : "",
        PASSWORDVALI : "",
        FLAG : 0,
        JOB : "",
        BIRTH : "",
        CURRENTWEIGHT : "",
        GOALWEIGHT : "",
        COMMENT : "",
        GENDER : 0
    }

    

    reset = ()=>{
        this.setState({
            ID : "",
            NAME : "",
            PASSWORD : "",
            PASSWORDVALI : "",
            FLAG : 0,
            JOB : "",
            BIRTH : "",
            CURRENTWEIGHT : "",
            GOALWEIGHT : "",
            COMMENT : "",
            GENDER : 0
        })
    }
    birthValidCheck(value){
        // const {BIRTH} = this.state;

        const year = Number(value.substr(0,4));
        const month = Number(value.substr(4,2));
        const day = Number(value.substr(6,2));

        const today = new Date();
        const yearNow = today.getFullYear();

        if(year < 1900 || year > yearNow){
            alert("연도를 확인하세요");
            return false;
        }
        if(month < 1 || month > 12){
            alert("달을 확인하세요");
            return false;
        }
        if(day < 1 || day > 31){
            alert("일자를 확인하세요");
            return false;
        }
        if((month === 4|| month === 6 || month === 9 || month === 11) && day === 31){
            alert("일자를 확인하세요");
            return false;
        }
        return true;
    }

    onChangeValue = (e)=>{
        console.log(e);
        if((e.target.name === "BIRTH" || e.target.name === "CURRENTWEIGHT" || e.target.name === "GOALWEIGHT" ) &&isNaN(e.target.value) === true){
            alert("숫자만 입력해주세요");
            return;
        }

        if(e.target.name === "BIRTH" && e.target.value.length === 8){
            // alert("안녕")
            if(!this.birthValidCheck(e.target.value)){
                return;
            }
        }else if(e.target.name === "BIRTH" && e.target.value.length > 8){
            alert("생년월일은 8자를 넘길수 없습니다.");
            return;
        }
        console.log(e.target.name);
        console.log(e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })

        if(this.state.FLAG && e.target.name === "ID"){
            this.setState({
                FLAG : 0
            })
        }
    }

    idValidCheck = ()=>{
        const{ ID } =this.state;
        if(ID.length < 5){
            alert("id는 4글자 이상이여야만 합니다.");
            return;
        }
        // console.log(ID);
        axios.get(`http://127.0.0.1:8000/valid/?id=${ID}`).then((result)=>{
            if(result.data[0].VALID){
                console.log(result)
                alert(`${ID}는 현재 사용중인 아이디 입니다.`);
                return;
            }else{
                console.log(result)

                alert(`${ID}는 사용가능한 아이디 입니다.`);
                this.setState({
                    FLAG : 1
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    signUp=()=>{
        // console.log(this.state);
        const {ID,PASSWORD,PASSWORDVALI,NAME,FLAG,BIRTH,JOB,CURRENTWEIGHT,GOALWEIGHT,COMMENT,GENDER} = this.state;
        if(FLAG === 0){
            alert("아이디 중복체크를 해주세요.");
            return;
        }
        if(PASSWORD !== PASSWORDVALI){
            alert("비밀번호를 확인해주세요");
            return;
        }
        if(!(this.birthValidCheck(BIRTH))){
            alert("생년월일을 확인해주세요");
            return;
        }
        // const account = {
            
        // };

        const dateType = BIRTH.substr(0,4)+'-'+BIRTH.substr(4,2)+'-'+BIRTH.substr(6,2);
        // const accountJson = JSON.stringify(account)
        this.props.signUp(ID,PASSWORD,NAME,dateType,JOB,CURRENTWEIGHT,GOALWEIGHT,COMMENT,GENDER)
    }

    render() {
        const {PASSWORD,PASSWORDVALI} = this.state;
        const options = [
            { key: 'af', value: 'MAN', text: 'MAN' },
            { key: 'ax', value: 'WOMAN', text: 'WOMAN' }
        ]
        console.log(this.state);
        return (
            <div className="AccountForm">
                <h1>회원 가입</h1>
                <div>
                    <label className="AccountFormLabel">ID : </label><input onChange={this.onChangeValue} name="ID"value={this.state.ID}placeholder="id"></input><button onClick={this.idValidCheck}>중복체크</button>
                </div>
                <div>
                    <label className="AccountFormLabel" >PASSWORD</label><input onChange={this.onChangeValue} name="PASSWORD" value={this.state.PASSWORD}type="password" placeholder="password1"></input><input onChange={this.onChangeValue} name="PASSWORDVALI" type="password" placeholder="password2"></input>{PASSWORD === PASSWORDVALI ? "비밀번호 일치" : "비밀번호 불일치"}
                </div>
                <div>
                    <label className="AccountFormLabel">이름</label><input name="NAME"  value={this.state.NAME} onChange={this.onChangeValue} placeholder="name"></input>
                </div>
                <div>
                    <Select placeholder='Select your country' name="GENDER" value="MAN"  options={options} />
                </div>
                <div>
                    <label className="AccountFormLabel">직업</label><input name="JOB"  value={this.state.JOB} onChange={this.onChangeValue} placeholder="job"></input>
                </div>
                <div>
                    <label className="AccountFormLabel" >생년월일</label><input onChange={this.onChangeValue} value={this.state.BIRTH}name="BIRTH" placeholder="YYYYMMDD" type="text"></input>
                </div>
                <div>
                    <label className="AccountFormLabel">현재체중</label><input onChange={this.onChangeValue} value={this.state.CURRENTWEIGHT} name="CURRENTWEIGHT" placeholder="xx"></input><label>KG</label>
                </div>            
                <div>
                    <label className="AccountFormLabel">목표체중</label><input onChange={this.onChangeValue}  value={this.state.GOALWEIGHT} name="GOALWEIGHT" placeholder="xx"></input><label>KG</label>
                </div>
                <div className="AccountFormTextAreaDiv">
                    <label className="AccountFormTextLabel">코멘트</label><textarea value={this.state.COMMENT} onChange={this.onChangeValue} className="textArea" name="COMMENT" cols="50" rows="11"></textarea>
                </div>
                <Button onClick={this.signUp}>회원가입</Button>
                <Button onClick={this.reset}>리셋</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signUp : bindActionCreators(signUp,dispatch)
    }
}

export default connect(null,mapDispatchToProps)(AccountForm)