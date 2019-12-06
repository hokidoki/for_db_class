import React, { Component,Fragment } from 'react'
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
            const date = item.send_date.substring(0,11)
                return (
                    <div className="sendToYouContainner">
                        <div>
                            <label className="sendToLabel">{item.sender}</label><label className="sendToMeLabelDate">{date}</label>
                        </div>
                        <div className="receiveMessage">
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
            <div className="messageModal">
                <div className="modalHeader">
                    <label className="closeModal" onClick={this.props.close_modal}>닫기</label>
                </div>
                <div className="messageList">
                    {conversation}
                </div>
            <div>
            {
                where.group_master === this.props.user|| where.level === 1?
                <Fragment>
                    <div >
                        <TextArea id="groupTextArea" style={{ 'width': '100%', 'maxHeight': '100px' }} onChange={this.onChangeValue} value={this.state.message} placeholder="작성해주세요" className="articleInputComment" name="message"  />
                    </div>
                    <div >
                        <Button id="groupTextButton" style={{ 'height': '80%' }} onClick={this.sendMessage} >등록</Button>
                    </div>
                </Fragment > :null
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