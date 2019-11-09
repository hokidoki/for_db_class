import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../Store/ACTIONS/Search';
import {bindActionCreators} from 'redux';

class Search extends Component {

    state = {
        searchText : "",
    }

    onChangeValue= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    Search = ()=>{
        const {searchText} = this.state;
        if(searchText.length < 0){
            alert("검색어를 작성해주세요.");
            return;
        }
        this.props.Search(searchText);
    }

    render() {
        return (
            <div className="search">
                <input name="searchText" value={this.state.searchText} onChange={this.onChangeValue}></input><button onClick={this.Search}>검색</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispach) =>{
    return {
        Search : bindActionCreators(search, dispach)
    }
}
export default connect(null,mapDispatchToProps)(Search)