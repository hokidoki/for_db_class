import React, { Component } from 'react'
import {connect } from 'react-redux'
import { modal_open } from  '../Store/REDUCER/Modal';
import {getGroupArticle} from '../Store/ACTIONS/Group';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import { groupMemberReset } from '../Store/ACTIONS/Group';

class GroupList extends Component {


    goAdminSite = (groupKey,index) =>{
        this.props.memberReset()
        this.props.history.push(`/main/group/admin/${groupKey}/${index}`)
    }

    goGroupSite = (groupKey) =>{
        this.props.getGroupArticle(groupKey)
    }
    goDataSite = () =>{
        this.props.history.push(`/main/publicdata`)
    }

    render() {
        console.log(this.props)
        const myAdminGroup = this.props.myAdminGroup.map((item,index)=>{
            return(<div className="myGroupDiv">
                <label className="groupNameLabel" onClick={()=>{this.goGroupSite(item.group_id)}}>
                    {item.group_name}
                </label>
                <label className="goToadmin"onClick={()=>{this.goAdminSite(item.group_id,index)}}>관리</label>
            </div>)
        })
        const joinedGroup = this.props.joinedGroup.map((item,index)=>{
            return(<div className="myGroupDiv">
                        <label className="groupNameLabel" onClick={()=>{this.goGroupSite(item.group_id)}}>
                        {item.group_name}
                        </label>
            </div>)
        })


        return (
            <div className="GroupList">
                <h1 className="GroupH1" id="publicData" onClick={this.goDataSite}>Publc Data</h1>                                
                <h1 className="GroupH1">Group</h1>
                <label onClick={this.props.open_modal} className="makeGroupLabel">
                    그룹 생성하기
                </label>
                {myAdminGroup}
                {joinedGroup}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        open_modal : () => dispatch(modal_open()),
        getGroupArticle : bindActionCreators(getGroupArticle,dispatch),
        memberReset : ()=> dispatch(groupMemberReset())
    }
}

const mapStateToProps = (state)=>{
    return {
        myAdminGroup : state.GROUP.adminGroup.groupInfo,
        joinedGroup : state.GROUP.joinedGroup.joinedGroup
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GroupList))