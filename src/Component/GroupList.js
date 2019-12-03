import React, { Component } from 'react'
import {connect } from 'react-redux'
import { modal_open } from  '../Store/REDUCER/Modal';
import { withRouter } from 'react-router-dom'
class GroupList extends Component {

    goAdminSite = (groupKey,index) =>{
        this.props.history.push(`/main/group/admin/${groupKey}/${index}`)
    }

    render() {
        console.log(this.props)
        const myAdminGroup = this.props.myAdminGroup.map((item,index)=>{
            return(<div>
                {item.group_name}<label onClick={()=>{this.goAdminSite(item.group_id,index)}}>관리</label>
            </div>)
        })


        return (
            <div className="GroupList">
                <h1 className="group">그룹</h1>                
                <label onClick={this.props.open_modal}>
                    그룹 생성하기
                </label>
                {myAdminGroup}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        open_modal : () => dispatch(modal_open())
    }
}

const mapStateToProps = (state)=>{
    return {
        myAdminGroup : state.GROUP.adminGroup.groupInfo
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GroupList))