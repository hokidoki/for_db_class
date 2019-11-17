import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import { Form,TextArea, Button} from 'semantic-ui-react';
import { modal_close } from '../../Store/REDUCER/Modal';
import {createGroup} from '../../Store/ACTIONS/Group'
import {bindActionCreators} from 'redux'
import '../../style/modal.css'


class CreateGroup extends Component {

    state ={
        groupName : "",
        groupComment : "",
        valid : false,
    }

    onChangeValue = (e)=>{
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        if(regExp.test(e.target.value)){
            alert("특수문자는 사용하실 수 없습니다.");
            return;
        }else{
            const value = e.target.value;
            const name = e.target.name;
            this.setState({
                [name] : value,
                valid : name === "groupName"? false : this.state.valid,
            })
        }
        
    }

    validGroupName = ()=>{
        if(this.state.groupName.length > 3){
            axios.get(`http://127.0.0.1:8000/valid/?mode=group&groupName=${this.state.groupName}`,{ headers : {
            'Content-Type': 'application/json;charset=UTF-8'}},).then((result)=>{
                
                if(!result.data){
                    this.setState({
                        valid : true,
                    })
                }else{
                    this.setState({
                        valid : false,
                    })
                }
            })
        }else{
            return;
        }
    }

    addGroup = ()=>{

        if(!this.state.valid){
            alert("이름을 확인해주세요");
            return;
        }
        const {groupName,groupComment} = this.state;
        this.props.createGroup(groupName,groupComment);
    }



    render() {
        return (
            <div className="modalOverlay">
            <div className="myModal">
                <div>
                    <label onClick={this.props.close_modal}>닫기</label>
                </div>
                <div>
                    생성할 그룹의 이름을 작성해주세요
                </div>
                <div>
                    <input name="groupName" value={this.state.groupName} onChange={this.onChangeValue}></input>
                <label>{
                    this.state.valid ? "사용 할 수 있는 그룹 명 입니다." : "사용 할 수 없는 그룹 명 입니다."
                }</label>
                <button onClick={this.validGroupName}>중복확인</button>
                <Form>
                    <TextArea name="groupComment" value={this.state.groupComment} onChange={this.onChangeValue} maxLength="150"></TextArea>
                    <Button onClick={this.addGroup}>그룹 생성하기</Button>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createGroup : bindActionCreators(createGroup,dispatch),
        close_modal : () => dispatch(modal_close())
    }
}


export default connect(null,mapDispatchToProps)(CreateGroup)