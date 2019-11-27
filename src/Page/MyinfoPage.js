import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { Image, Button} from 'semantic-ui-react';

import {getArticle} from '../Store/ACTIONS/Article';
import {bindActionCreators} from 'redux';
import {getArticleReset} from '../Store/ACTIONS/Article';

import styled from 'styled-components';

const InvisibleUploadButton = styled.input`
    display : none;
`

class MyInfoPage extends Component {

    constructor(props){

        super(props);
        const {NAME ,IMAGE,JOB, CURRENTWEIGHT,GOALWEIGHT,COMMENT } = this.props.USER;
        console.log(this.props);
        this.state = {
            IMAGES : [{
                src : IMAGE ? IMAGE :'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
            }],
            NAME : NAME,
            JOB : JOB,
            CURRENTWEIGHT : CURRENTWEIGHT,
            GOALWEIGHT : GOALWEIGHT,
            COMMENT : COMMENT,
        }
    }

    onImageChage = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            this.setState({
                IMAGES: [
                    {
                        file: file,
                        src: reader.result
                    },
                    ...this.state.IMAGES
                ]
            })
            this.refs.image.value = "";
        }
    }
    onDeleteImage = ()=> {
        this.setState({
            IMAGES: [{
                src : 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
            }]
        })
    }
    onHandleChane = () => {
        this.refs.image.click();
    }



    render(){
        
        return(
            <div className="FriendsListPage" style={{'overflowY' : 'auto'}} >
                <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChage} />
                <h1>회원정보 수정 </h1>
                <Image
                    className ="userIconPrivew"
                    style = {{'width' : '60px' , 'height' : '60px', 'borderRadius: ' : '100px',}}
                    src= {this.state.IMAGES[0].src}
                    onClick = {this.onDeleteImage}
                /> 
                <Button style={{ 'marginLeft': "7px", 'width': '100px' }} onClick={this.onHandleChane}>이미지 추가</Button>
                별명 : <input type="text" value={this.state.NAME} />
                직업 : <input type="text" value={this.state.JOB} />
                현재 체중 : <input type="text" value={this.state.CURRENTWEIGHT} />
                목표 체중 : <input type="text" value={this.state.GOALWEIGHT} />
                자기 소개 : <input type="text" value={this.state.COMMENT} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        
    }
  }

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in.user
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyInfoPage));