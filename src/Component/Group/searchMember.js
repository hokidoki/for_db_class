import React, { Component } from 'react'

class SearchGroupMember extends Component {
    
    state = {
        searchMemberKeyword : ""
    }
    
    search = () => {
        const { searchMemberKeyword } = this.state;
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
                <input onChange={this.onChange}  placeholder="아이디를 검색해주세요" name="searchMemberKeyword"value={this.state.searchMemberKeyword}></input>
                <button className="changeInfoButton" onClick={this.search}>검색</button>
            </div>
        )
    }
}

export default SearchGroupMember;