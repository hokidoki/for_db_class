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
        
        const { bothFollow } = this.props;
        const myFrinds = bothFollow.map((item)=>{
            const src = item.PROFILE_IMAGE ? item.PROFILE_IMAGE : 'http://react.semantic-ui.com/images/avatar/large/steve.jpg';
            return (
                <div className="friendRow" onClick={() => {this.openMessageBox(item.ID)}}>
                    <div className="friendRowImageDiv" ><Image src={src} id="bothImage" style={{'height': '35px', 'width':'35px'}}></Image></div><div className="friendRowImageName" ><label clsaaName="friendRowLabelName"style={{'color' : 'wheat'}}  value={item.NAME}>{item.NAME}</label></div>
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