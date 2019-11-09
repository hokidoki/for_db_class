import React, { Component } from 'react'
import { Card, Image,Radio } from 'semantic-ui-react'
import { friendRequest } from '../../Store/ACTIONS/Account';
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
      if(isLoading){
        return;
      }
      console.log(index);
      this.props.friendRequest(id,rowId,check,index);
    }
    render() {
        return (
            <div className="SearchCard">
                <Card.Group>
                  <Card id="ui_card">
                  <Card.Content >
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{this.props.name}</Card.Header>
        <Card.Meta>{this.props.id}</Card.Meta>
        <Card.Description>
          {this.props.comment}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        친구 : <Radio toggle checked={this.props.check} onClick={this.onClick}/> 
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
  }
}

export default connect(null,mapDispatchToProps)(SearchResult);