import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import { Form,TextArea, Button} from 'semantic-ui-react';
import { modal_close } from '../Store/REDUCER/Modal';
import {bindActionCreators} from 'redux'
import '../style/modal.css'


class MessageModal extends Component {

    static defaultProps = {
        conversasion : []
    }

    state ={
        message : ""
    }

    onChangeValue = (e)=>{
        
            const value = e.target.value;
            const name = e.target.name;
            this.setState({
                [name] : value,
                valid : name === "groupName"? false : this.state.valid,
            })
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
                <div className="messageList">

                </div>
                <div>
                <Form>
                    <TextArea style={{'width' : '80%','display' : 'inlineBlock'}}name="groupComment" value={this.state.message} onChange={this.onChangeValue} maxLength="150"></TextArea>
                    <Button style={{'width' : '20%','display' : 'inlineBlock'}}onClick={this.addGroup}>그룹 생성하기</Button>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        close_modal : () => dispatch(modal_close())
    }
}


export default connect(null,mapDispatchToProps)(MessageModal)