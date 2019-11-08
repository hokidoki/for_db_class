import React, { Component } from 'react'
import { connect } from 'react-redux';
class Search extends Component {

    state = {
        searchText : "",
    }

    onChangeValue= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <div className="search">
                <input name="searchText" value={this.state.searchText} onChange={this.onChangeValue}></input><button>검색</button>
            </div>
        )
    }
}

export default connect(null,null)(Search)