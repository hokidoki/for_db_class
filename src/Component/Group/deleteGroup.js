import React, { Component } from 'react'

class DeleteGroup extends Component {
    
    state = {
        checkGroupName : "",
        iagree : "이 그룹을 삭제하도록 하겠습니다."
    }
    
    deleteGroup = () => {
        const { checkGroupName,iagree } = this.state;

        if(checkGroupName !== iagree ){
            alert("삭제 확인 문구를 작성해주세요");
            return;
        }
        
        this.props.deleteFunction(this.props.where);
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <div className="deleteGroupContainner">
                이 그룹을 삭제하도록 하겠습니다. 를 작성해주세요.
                <input value={this.state.checkGroupName} name="checkGroupName" onChange={this.onChange}></input>
                <button onClick={this.deleteGroup}>삭제</button>
            </div>
        )
    }
}



export default DeleteGroup;