import React, { Component } from 'react'
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {groupMessageModalOpen} from '../../Store/REDUCER/Modal'


class GroupList extends Component {
    static defualtProps = {
        group : []
    }

    openMessageBox = (where) =>{
        this.props.messageModal(where)
    }
    render() {
        
        const { group } = this.props;
        const myGroup = group.map((item)=>{
            const src = item.PROFILE_IMAGE ? item.PROFILE_IMAGE : 'https://png.pngtree.com/element_pic/00/16/06/23576b5b5c020c5.jpg';
            return (
                <div className="friendRow">
                    <div className="friendRowImageDiv" ><Image src={src} size="mini" style={{'display' : 'inlineBlock'}}></Image></div><div className="friendRowImageDiv" ><label onClick={() => {this.openMessageBox(item)}} value={item.NAME}>{item.group_name}</label></div>
                </div>
            )
        })
        return (
            <div className="friendsListContainner">
                {myGroup}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        messageModal : (where) => dispatch(groupMessageModalOpen(where))
    }
}
export default connect(null,mapDispatchToProps)(GroupList);