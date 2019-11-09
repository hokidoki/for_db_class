import React, { Component } from 'react'
import {connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

class Logo extends Component {
    goToMain= ()=>{
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


export default connect(null,null)(withRouter(Logo));
