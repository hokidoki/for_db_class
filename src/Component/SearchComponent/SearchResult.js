import React, { Component } from 'react'
import { Card, Image,Radio } from 'semantic-ui-react'
import { friendRequest } from '../../Store/ACTIONS/Account';
import { groupJoin } from '../../Store/ACTIONS/Group';
import { connect } from 'react-redux';

class SearchResult extends Component {
    static defaultProps = {
        id : "id",
        name : "name",
        birth : "2019-09-03",
        friend_row_od : null,
        isFriend : false
    }

    onClick = ()=>{
        const {id,rowId,index,check,isLoading} =this.props;
        const {member_row_id} = this.props;
        if(isLoading){
          return;
        }
        if(this.props.mode === "groupCard"){
          this.props.groupJoin(id,member_row_id,check,index);
        }else{
          this.props.friendRequest(id,rowId,check,index);
      }
    }
    
    render() {
      const src = this.props.profile_image ? this.props.profile_image : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';

        return (
            <div className="SearchCard">
                <Card.Group>
                  <Card id="ui_card">
                  <Card.Content >
        <Image
          floated='right'
          size='mini'
          src={src}
        />
        <Card.Header>{this.props.name}</Card.Header>
        <Card.Meta>{this.props.mode === "groupCard" ? `개설 일자 : ${this.props.created_at}` :this.props.id}</Card.Meta>
        <Card.Description>
          {this.props.comment}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          ${this.props.mode === "groupCard" && this.props.user === this.props.group_master ? 
                null :  <Radio toggle checked={this.props.check} onClick={this.onClick}/> 
          }
        </div>
      </Card.Content>
              </Card>
              </Card.Group>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    friendRequest : (FRIEND_REQUEST_ID,ROW_ID,FRIEND_STATE,index) =>{dispatch(friendRequest(FRIEND_REQUEST_ID,ROW_ID,FRIEND_STATE,index))},
    groupJoin : (GROUP_KEY,MEMBER_ROW_ID,CHECK,index) =>{dispatch(groupJoin(GROUP_KEY,MEMBER_ROW_ID,CHECK,index))},

  }
}

export default connect(null,mapDispatchToProps)(SearchResult);