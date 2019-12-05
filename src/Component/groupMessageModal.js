import React, { Component } from 'react'
import {connect} from 'react-redux';
import { sendGroupMessage,getGroupMessage } from '../Store/ACTIONS/Message';
import { Form,TextArea, Button} from 'semantic-ui-react';
import { modal_close } from '../Store/REDUCER/Modal';
import {bindActionCreators} from 'redux'
import '../style/modal.css'


class GroupMessageModal extends Component {

    static defaultProps = {
        conversation : []
    }

    componentDidMount(){
        const { where } = this.props; 
        const key = where.group_id ? where.group_id : where.group_key;
        this.props.getGroupMessage(key);
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
        const { user,where } = this.props; 
        const key = where.group_id ? where.group_id : where.group_key;
        console.log(key)
        this.props.sendGroupMessage(key,message,user);
        this.setState({
            message : ""
        })
    }

    render() {

        const conversation = this.props.conversation.map((item)=>{
                return (
                    <div className ="sendToMeContainner">
                        <div>
                            <label className="sendToLabel">{item.sender}</label><label className="sendToLabelDate">{item.send_date}</label>
                        </div>
                        <div>
                            {item.message}
                        </div>
                    </div>
                )
        })
        const {where} = this.props;
        console.log(this.props.where)
        console.log(this.props);
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
                    {
                        where.group_master === this.props.user|| where.level === 1?
                        <Form>
                            <TextArea style={{'width' : '80%','display' : 'inlineBlock'}}name="message" value={this.state.message} onChange={this.onChangeValue} maxLength="150"></TextArea>
                            <Button style={{'width' : '20%','display' : 'inlineBlock'}} onClick={this.sendMessage}>전송</Button>
                        </Form> : null
                    }
                
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        conversation : state.MESSAGE.GetGroupMessage.conversation
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        close_modal : () => dispatch(modal_close()),
        sendGroupMessage : bindActionCreators(sendGroupMessage,dispatch),
        getGroupMessage : bindActionCreators(getGroupMessage,dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GroupMessageModal)