import React, { Component } from 'react'
import {connect } from 'react-redux'
import { modal_open } from  '../Store/REDUCER/Modal';
class GroupList extends Component {

    render() {
        const myAdminGroup = this.props.myAdminGroup.map((item)=>{
            return(<div>
                {item.group_name}
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

export default connect(mapStateToProps,mapDispatchToProps)(GroupList)