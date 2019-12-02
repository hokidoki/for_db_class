import React, { Component } from 'react'
import {connect} from 'react-redux';
import { sendMessage,getMessage } from '../Store/ACTIONS/Message';
import { Form,TextArea, Button} from 'semantic-ui-react';
import { modal_close } from '../Store/REDUCER/Modal';
import {bindActionCreators} from 'redux'
import '../style/modal.css'


class MessageModal extends Component {

    static defaultProps = {
        conversation : []
    }

    componentDidMount(){
        this.props.getMessage(this.props.who);
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


    sendMessage = () =>{
        const { message } = this.state;
        const { who } = this.props; 
        this.props.sendMessage(who,message);
        this.setState({
            message : ""
        })
    }

    render() {

        const conversation = this.props.conversation.map((item)=>{
            const {who, user} = this.props;
            const check = item.RECIEVE_DATE ? item.RECIEVE_DATE : "읽지 않음";
            if(who === user){
                return (
                    <div className ="sendToMeContainner">
                        <div>
                            <label className="sendToLabel">{item.SENDER}</label><label className="sendToLabelDate">{item.SEND_DATE}</label>
                        </div>
                        <div>
                            {item.MESSAGE}
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className ="sendToWhoContainner">
                        <div>
                            <label className="sendToLabel">{item.SENDER}</label><label className="sendToLabelDate">{item.SEND_DATE}</label><label className="sendToLabelDate">{check}</label>
                        </div>
                        <div>
                            {item.MESSAGE}
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className="modalOverlay">
            <div className="myModal">
                <div>
                    <label onClick={this.props.close_modal}>닫기</label>
                </div>
                <div className="messageList">
                    {conversation}
                </div>
                <div>
                <Form>
                    <TextArea style={{'width' : '80%','display' : 'inlineBlock'}}name="message" value={this.state.message} onChange={this.onChangeValue} maxLength="150"></TextArea>
                    <Button style={{'width' : '20%','display' : 'inlineBlock'}} onClick={this.sendMessage}>전송</Button>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        conversation : state.MESSAGE.GetMessage.conversation
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        close_modal : () => dispatch(modal_close()),
        sendMessage : bindActionCreators(sendMessage,dispatch),
        getMessage : bindActionCreators(getMessage,dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MessageModal)