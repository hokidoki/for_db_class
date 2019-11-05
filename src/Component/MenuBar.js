import React, { Component } from 'react'
import LoGo from './Logo';
import LoginBox from './LoginComponent';
import Search from './Search'
import '../style/menu.css';

class MenuBar extends Component {
    render() {
        // console.log(this.props.user)
        return (
            <div className="MenuBar">
                <LoGo></LoGo>
                {this.props.user.user ? <Search></Search> : <LoginBox></LoginBox>}
            </div>
        )
    }
}

export default MenuBar;