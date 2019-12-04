import React, { Component } from 'react'

class SearchGroupMember extends Component {
    
    state = {
        searchMemberKeyword : ""
    }
    
    search = () => {
        const { searchMemberKeyword } = this.state;
        console.log("hello");   
        this.props.search(searchMemberKeyword);
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <div className="deleteGroupContainner">
                <input onChange={this.onChange} name="searchMemberKeyword"value={this.state.searchMemberKeyword}></input>
                <button onClick={this.search}>검색</button>
            </div>
        )
    }
}

export default SearchGroupMember;