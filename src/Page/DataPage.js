import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../style/main.css'
import { withRouter } from 'react-router-dom'
import { getData,publicDataReset} from '../Store/ACTIONS/Data';
import { bindActionCreators } from 'redux';

import '../style/main.css'

import {  Card } from 'semantic-ui-react'

class DataPage extends Component {

    componentWillUnmount(){
        this.props.reset();
    }
    state = {
        searchAddressKeyword : ""
    }


    search = () => {
        const {searchAddressKeyword} =this.state;
        console.log("hi")
        this.props.getData(searchAddressKeyword);
    }
  
    render() {
        const searchResult = this.props.searchResult.map((item) => {
            console.log(item)
            return (
                <Card style={{'width' : '100%'}}>
                    <Card.Content>
                        <Card.Header style={{'color' : 'gray'}}>{item.ExercisePlace}</Card.Header>
                        <Card.Header style={{'color' : 'gray'}}>{item.ExerciseAddress}</Card.Header>
                    </Card.Content>
                </Card>
            )
        })
        return (
            <div className="DataPage">
                <div className="groupAdminMid">
                    <div className="adminFunctions">
                        <div className="adminFunction">
                            <h2 className="adminH2">
                            <label id="groupMemberButton" name="mode" value="searchGroupMembers">공원 검색</label>
                            </h2>
                        </div>
                    </div>
                    <input onChange={this.onChange}  placeholder= "주소를 검색해주세요" name="searchMemberKeyword"value={this.state.searchMemberKeyword}></input>
                    <button className="changeInfoButton" onClick={this.search}>검색</button>
                    <div className="groupSearchResults">
                        <div className="dummyRow"></div>
                        {searchResult}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResult : state.PUBLICDATA.getPublic
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getData : bindActionCreators(getData,dispatch),
        reset : bindActionCreators(publicDataReset,dispatch)
       
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataPage));