import React, { Component } from 'react'

class DeleteGroup extends Component {
    
    state = {
        checkGroupName : ""
    }
    
    deleteGroup = () => {
        const { checkGroupName } = this.state;
        const { groupName } = this.props; 

        if(checkGroupName === groupName ){
            alert("삭제하시려는 그룹의 이름을 제대로 작성해주세요");
            return;
        }
        
        
    }
    render() {
        return (
            <div className="deleteGroupContainner">
                <input value={this.state.checkGroupName} placeholder="삭제하시려는 그룹의 이름을 작성해주세요"></input>
                <button>삭제</button>
            </div>
        )
    }
}



export default DeleteGroup;