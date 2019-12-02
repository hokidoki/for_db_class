import React, { Component } from 'react'
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {messageModalOpen} from '../Store/REDUCER/Modal'

class FriendsList extends Component {
    static defualtProps = {
        friends : []
    }

    openMessageBox = (who) =>{
        this.props.messageModal(who)
    }
    render() {
        
        const { friends } = this.props;
        console.log(friends)
        const myFrinds = friends.map((item)=>{
            const src = item.PROFILE_IMAGE ? item.PROFILE_IMAGE : 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
            
            return (
                <div className="friendRow">
                    <div className="friendRowImageDiv" ><Image src={src} size="mini" style={{'display' : 'inlineBlock'}}></Image></div><div className="friendRowImageDiv" ><label onClick={() => {this.openMessageBox(item.FRIEND_ID)}} value={item.NAME}>{item.NAME}</label></div>
                </div>
            )
        })
        return (
            <div className="friendsListContainner">
                {myFrinds}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        messageModal : (who) => dispatch(messageModalOpen(who))
    }
}
export default connect(null,mapDispatchToProps)(FriendsList);