import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import { sendMessage, getMessage } from '../Store/ACTIONS/Message';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { modal_close } from '../Store/REDUCER/Modal';
import { bindActionCreators } from 'redux'
import '../style/modal.css'


class MessageModal extends Component {

    static defaultProps = {
        conversation: []
    }

    componentDidMount() {
        this.props.getMessage(this.props.who);
    }

    state = {
        message: ""
    }

    onChangeValue = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
            valid: name === "groupName" ? false : this.state.valid,
        })
    }


    sendMessage = () => {
        const { message } = this.state;
        const { who } = this.props;
        this.props.sendMessage(who, message);
        this.setState({
            message: ""
        })
    }

    render() {

        const conversation = this.props.conversation.map((item) => {
            const { who, user } = this.props;
            const check = item.RECIEVE_DATE ? item.RECIEVE_DATE : "읽지 않음";
            const date = item.SEND_DATE.substring(0,11)
            if (item.SENDER === user) {
                return (
                    <div className="sendMeContainner">
                        <div>
                            <label className="sendToLabel">{item.SENDER}</label><label className="sendToLabelDate">{date}</label><label className="sendToLabelDate">{check}</label>
                        </div>
                        <div className="sendMessage">
                            {item.MESSAGE}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="sendToYouContainner">
                        <div>
                            <label className="sendToLabel">{item.SENDER}</label><label className="sendToMeLabelDate">{date}</label>
                        </div>
                        <div className="receiveMessage">
                            {item.MESSAGE}
                        </div>
                    </div>
                )
            }
        })
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
                <Fragment>
                    <div >
                        <TextArea id="groupTextArea" style={{ 'width': '100%', 'maxHeight': '100px' }} onChange={this.onChangeValue} value={this.state.message} placeholder="작성해주세요" className="articleInputComment" name="message"  />
                    </div>
                    <div >
                        <Button id="groupTextButton" style={{ 'height': '80%' }} onClick={this.sendMessage} >등록</Button>
                    </div>
                </Fragment >
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        conversation: state.MESSAGE.GetMessage.conversation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close_modal: () => dispatch(modal_close()),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        getMessage: bindActionCreators(getMessage, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageModal)