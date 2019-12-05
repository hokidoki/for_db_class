import React, { Component } from 'react'
import AccountForm from '../Component/AccountForm'
import '../style/index.css'

export default class IndexPage extends Component {
    render() {
        return (
            <div className="IndexPage">
                <AccountForm></AccountForm>
            </div>
        )
    }
}

