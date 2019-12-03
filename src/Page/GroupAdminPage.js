import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../style/main.css'
import { withRouter } from 'react-router-dom'
class GroupAdminPage extends Component {

    state = {
        mode : "searchGroupMembers"
    }

    componentDidMount(){
        const {USER,MANAGE_GROUP,match} = this.props;
        const {index, where } = match.params;
        console.log(this.props)
        if( MANAGE_GROUP[index].group_master === USER && MANAGE_GROUP[index].group_id ===where){

        }else{
            this.props.history.push('/main');
        }
    }

    adminFunction = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <div className="groupAdminPage">
                <div className="adminFunctions">
                    <div className="adminFunction">
                        <label onClick={this.adminFunction}name="mode" value="searchGroupMembers">그룹원 검색</label>
                    </div>
                    <div className="adminFunction">
                        <label onClick={this.adminFunction} name="mode" value="groupMemberLevel">그룹원 등급 변환</label>
                    </div>
                    <div className="adminFunction">
                        <label onClick={this.adminFunction} style={{'color' : 'red'}}name="mode" value="deleteFunction">그룹 삭제</label>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in.user.ID,
        MANAGE_GROUP : state.GROUP.adminGroup.groupInfo
    }
  }
  
export default connect(mapStateToProps,null)(withRouter(GroupAdminPage));