import React, { Component } from 'react'
import AccountForm from '../Component/AccountForm'
import Notice from '../Component/Notice'
import '../style/index.css'

export default class IndexPage extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="IndexPage">
                <Notice></Notice>
                <AccountForm></AccountForm>
            </div>
        )
    }
}

