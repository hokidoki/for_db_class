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
            const src = item.PROFILE_IMAGE ? item.PROFILE_IMAGE : 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-flat-barbell-image_1128077.jpg';
            return (
                <div className="friendRow" onClick={() => {this.openMessageBox(item)}}>
                    <div className="friendRowImageDiv" ><Image src={src} size="mini" style={{'display' : 'inlineBlock'}}></Image></div><div className="friendRowImageName"  ><label clsaaName="friendRowLabelName"style={{'color' : 'wheat'}} value={item.NAME}>{item.group_name}</label></div>
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