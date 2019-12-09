import React, { Component,Fragment } from 'react'
import { Button , Select} from 'semantic-ui-react'
import axios from 'axios';
import { connect } from 'react-redux';
// import * as actionType from '../Store/ACTIONS/ActionType';
import { bindActionCreators } from 'redux';
import { signUp } from '../Store/ACTIONS/Account';
import indexImage from '../image/form-img.jpg'


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
        PAGE : 1,
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
        this.setState({
            [e.target.name] : e.target.value
        })

        if(this.state.FLAG && e.target.name === "ID"){
            this.setState({
                FLAG : 0
            })
        }
    }
    nextButtonClick = (e)=>{
        const{ ID,PASSWORD, PASSWORDVALI,BIRTH} =this.state;
        if(ID.length < 5){
            this.setState({
                warning : "아이디를 확인해주세요"
            })
            return;
        }
        axios.get(`http://121.150.186.143:8000/valid/?id=${ID}&mode=id`).then((result)=>{
            if(result.data[0].VALID){
                this.setState({
                    warning : `${ID}는 현재 사용중인 아이디 입니다.`
                })
                return;
            }else{
                alert(`${ID}는 사용가능한 아이디 입니다.`);
                if(PASSWORD === PASSWORDVALI || PASSWORD.length < 5 ||PASSWORD.length < 5 ){
                    if(!(this.birthValidCheck(BIRTH))){
                        this.setState({
                            warning : "생년월일은 YYYY-MM-DD 형식에 맞춰주세요."
                        })
                        return;
                    }                    
                    this.setState({
                        PAGE : 2,
                        FLAG : 1,
                        warning : ""
                    })
                }else{
                    this.setState({
                        warning : "비밀번호를 확인해주세요"
                    })
                }
                
            }
        }).catch((err)=>{
            console.log(err);
        })


    }

    preventPage = ()=>{
        this.setState({
            PAGE : 1
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
        return (
            <div className="AccountForm">
                <div class="main">
        <div class="container">
            <div class="booking-content">
                <div class="booking-image">
                    <img class="booking-img" src={indexImage} alt="Booking Image"/>
                </div>
                <div class="booking-form">
                    <form id="booking-form">
                        <h2>It's not only for you. for ALL !</h2>
                        { this.state.PAGE === 1 ?<Fragment><div class="form-group form-input">
                            <input type="text" id="name"  onChange={this.onChangeValue} name="ID"value={this.state.ID} required/>
                            <label for="name" class="form-label">아이디</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone" onChange={this.onChangeValue} name="PASSWORD" value={this.state.PASSWORD} type="password" required />
                            <label for="phone" class="form-label">비밀번호</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone" onChange={this.onChangeValue} name="PASSWORDVALI" type="password" value={this.state.PASSWORDVALI} required />
                            <label for="phone" class="form-label">{PASSWORD === PASSWORDVALI ? "비밀번호 일치" : "비밀번호 불일치"}</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone"  name="JOB"  value={this.state.JOB} onChange={this.onChangeValue}  required />
                            <label for="phone" class="form-label">직업</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone" onChange={this.onChangeValue} value={this.state.BIRTH}name="BIRTH"  required />
                            <label for="phone" class="form-label">생년월일</label>
                        </div>
                        <div class="form-submit">
                            <input type="button" value="다음 질문으로" class="submit" id="submit" name="submit" onClick={this.nextButtonClick}/>
                            <a href="#" class="vertify-booking">{this.state.warning}</a>
                        </div> </Fragment>:<Fragment> 
                        <div class="form-group form-input">
                            <input id="phone" onChange={this.onChangeValue}  value={this.state.NAME} name="NAME" required />
                            <label for="phone" class="form-label">닉네임</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone" onChange={this.onChangeValue}  value={this.state.GOALWEIGHT} name="GOALWEIGHT" required />
                            <label for="phone" class="form-label">목표체중</label>
                        </div>
                        <div class="form-group form-input">
                            <input type="text"  onChange={this.onChangeValue} value={this.state.CURRENTWEIGHT} name="CURRENTWEIGHT"  required/>
                            <label for="name" class="form-label">현재체중</label>
                        </div>
                        <div class="form-group form-input">
                            <input id="phone" value={this.state.COMMENT} onChange={this.onChangeValue} name="COMMENT" required />
                            <label for="phone" class="form-label">한줄 소개</label>
                        </div>
                        <div class="form-submit">
                            <input type="button" value="회원가입" class="submit" id="submit" style={{'display':'inlineBlock'}}name="submit" onClick={this.signUp}/>
                            <a href="#" class="vertify-booking" onClick={this.preventPage}>이전으로 돌아가기</a>
                        </div></Fragment>}
                    </form>
                </div>
            </div>
        </div>
    </div>                
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