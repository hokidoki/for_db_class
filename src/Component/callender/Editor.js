import React, { Component } from 'react';
import { Button} from 'semantic-ui-react';

import {postArticle} from '../../Store/ACTIONS/Article';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Editor extends Component {
    state = {
        MORNING : "",
        LUNCH : "",
        DINNER : "",
        COMMENT : "",
    }

    onChangeValue = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addArticle = () =>{
        const {MORNING,LUNCH,DINNER,COMMENT} = this.state;
        this.props.postArticle(MORNING,LUNCH,DINNER,COMMENT);
    }
    render() {
        return (
            <div className="Editor">
                <div>
                <input name="MORNING" onChange={this.onChangeValue} value={this.state.MORNING}></input>
                </div>
                <div>
                <input name="LUNCH" onChange={this.onChangeValue} value={this.state.LUNCH}></input>
                </div>
                <div>
                <input name="DINNER" onChange={this.onChangeValue} value={this.state.DINNER}></input>
                </div>
                <div>
                <textarea name="COMMENT" onChange={this.onChangeValue} value={this.state.COMMENT}></textarea>
                </div>
                <Button onClick={this.addArticle}>전송</Button>
            </div>
        )
    }
}

const mapDispacthToProps = (dispatch) =>{
    return {
        postArticle : bindActionCreators(postArticle,dispatch)
    }
}

export default connect(null,mapDispacthToProps)(Editor)