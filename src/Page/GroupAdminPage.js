import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../style/main.css'
import { withRouter } from 'react-router-dom'
import { searchMembers,changeMemberLevel,deleteGroup } from '../Store/ACTIONS/Group'
import {bindActionCreators} from 'redux';
import  SearchGroupMember  from '../Component/Group/searchMember'
import DeleteGroup from '../Component/Group/deleteGroup'
import { Button, Card} from 'semantic-ui-react'

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

    searchFunction = ()=>{
        this.setState({
            mode : "searchGroupMembers"
        })
    }
    deleteFunction = ()=>{
        this.setState({
            mode : "deleteGroup"
        })
    }

    searchMembers = (searchKeyword) =>{
        const {match} = this.props;
        const {where} = match.params;
        this.props.searchMembers(where,searchKeyword);
    }
    changeMemberLevelsUp = (group_member_id,id) =>{
        const {match} = this.props;
        const {where} = match.params;
        this.props.changeMemberLevel(group_member_id,1,where,id)
    }
    changeMemberLevelsDown = (group_member_id,id) =>{
        const {match} = this.props;
        const {where} = match.params;
        this.props.changeMemberLevel(group_member_id,0,where,id)
    }

    render() {
        const {match} = this.props;
        const {where} = match.params;
        console.log(this.props.SEARCH_GROUP_MEMBER)
        const searchResult = this.props.SEARCH_GROUP_MEMBER.map((item)=>{
            console.log(this.props.SEARCH_GROUP_MEMBER)

            return (
                <Card>
      <Card.Content>
        <Card.Header>{item.member_id}</Card.Header>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={()=> {this.changeMemberLevelsUp(item.member_row_id,item.member_id)}}>
            관리자 임명
          </Button>
          <Button basic color='red' onClick={()=> {this.changeMemberLevelsDown(item.member_row_id,item.member_id)}}>
            회원으로 임명
          </Button>
        </div>
      </Card.Content>
    </Card>
            )
        })
        return (
            <div className="groupAdminPage">
                <div className="adminFunctions">
                    <div className="adminFunction">
                        <label onClick={this.searchFunction} name="mode" value="searchGroupMembers">그룹원 검색</label>
                    </div>
                    <div className="adminFunction">
                        <label onClick={this.deleteFunction} style={{'color' : 'red'}} name="mode" value="deleteFunction">그룹 삭제</label>
                    </div>
                </div>
                {
                    this.state.mode === "searchGroupMembers" ? 
                        <SearchGroupMember search={this.searchMembers}></SearchGroupMember> : <DeleteGroup where={where} deleteFunction={this.props.deleteGroup}></DeleteGroup>
                }
                <div className="groupSearchResults">
                    <div className="dummyRow"></div>
                    {searchResult}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in.user.ID,
        MANAGE_GROUP : state.GROUP.adminGroup.groupInfo,
        SEARCH_GROUP_MEMBER : state.GROUP.searchGroupMembers.members
    }
  }


  const mapDispatchToProps = (dispatch) =>{
    return {
        searchMembers : bindActionCreators(searchMembers,dispatch),
        changeMemberLevel : bindActionCreators(changeMemberLevel,dispatch),
        deleteGroup : bindActionCreators(deleteGroup,dispatch)
    }
  }

  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GroupAdminPage));