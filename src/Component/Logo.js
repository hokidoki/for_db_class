import React, { Component } from 'react'
import {connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {getArticle,getArticleReset} from '../Store/ACTIONS/Article';


class Logo extends Component {
    goToMain= ()=>{
        if(!this.props.USER) return ; 
        this.props.reset();
        this.props.getArticle();
        this.props.history.push('/main');
    }
    render() {
        return (
            <div className="menuLogo" style={{'&:hover' : 'pointer'}}onClick={this.goToMain}>
                LOGO
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getArticle : bindActionCreators(getArticle,dispatch),
        reset : ()=> { dispatch(getArticleReset)}
    }
}

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Logo));
