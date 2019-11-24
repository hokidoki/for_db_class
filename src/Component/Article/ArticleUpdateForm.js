import React, { Component } from 'react';
import { Button, Form, TextArea} from 'semantic-ui-react';

import {putUpdateArticle} from '../../Store/ACTIONS/Article';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import '../../style/Editor.css'

const InvisibleUploadButton = styled.input`
    display : none;
`
const Preview = styled.div`
    margin-left : 20px;
    margin-top : 10px;
    width : 100%
    height : 100%;
    border-radius : 5px;
    background-image : url(${props=>props.src});
    background-repeat : no-repeat;
    background-position : center center;
    &:hover{
        cursor : pointer;
    }
`
class UpdateEditor extends Component {

    constructor(props){
        super(props);
        this.state = {
            BREAKFAST : this.props.breakFast,
            LUNCH : this.props.lunch,
            DINNER : this.props.dinner,
            COMMENT : this.props.comment,
            IMAGES : [{
                src : this.props.image
            }],
        }
        
    }

    onChangeValue = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateArticle = () =>{
        const {BREAKFAST,LUNCH,DINNER,COMMENT,IMAGES} = this.state;
        const {articleRowId,image,index,setMode} = this.props;
        this.props.updateArticle(articleRowId,image,IMAGES[0],BREAKFAST,LUNCH,DINNER,COMMENT,index,setMode);
    }

    onImageChage = (e) =>{
        if(!(e.target.files && e.target.files.length && this.state.IMAGES.length <= 1)){
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = ()=>{
            this.setState({
                IMAGES : [
                    {
                        file : file,
                        src : reader.result
                    },
                    ...this.state.IMAGES
                ]
            })
            this.refs.image.value = "";
        }
    }

    onHandleChane = ()=>{
        this.refs.image.click();
    }

    onDeleteImage = index =>{
        this.setState({
            IMAGES : this.state.IMAGES.filter((item,i)=> i === index)
        })
    }
    render() {
        const { IMAGES } = this.state; 
        // const {user,writer} = this.props;
        const list = IMAGES.map((image,index)=>{
            return (
                <Preview
                    key={index}
                    src={image.src}
                    onClick={()=>{
                        this.onDeleteImage(image)
                    }}
                ></Preview>
            )
        }) 
        return (
            <div className="Editor">
                <div className="EditorInputBox">
                    <div className="imageDiv">
                        <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChage}/>
                        {list}
                    </div>
                    <div className="whatEatInput">
                        <Form.Input className="articleInput" fluid name="BREAKFAST" placeholder='breakfast' value={this.state.BREAKFAST} onChange={this.onChangeValue} />    
                        <Form.Input className="articleInput" fluid name="LUNCH" placeholder='lunch' value={this.state.LUNCH} onChange={this.onChangeValue} />    
                        <Form.Input className="articleInput" fluid name="DINNER"  placeholder='dinner' value={this.state.DINNER} onChange={this.onChangeValue} /> 
                        <div className = "imageButton" >
                        <Button style={{'marginLeft' : "7px",'width' : '100px'}} onClick={this.onHandleChane}>이미지 추가</Button>
                        </div>
                    </div>
                </div>
                
                <div className="articleInputDiv">
                    <Form>
                    <TextArea style={{ 'width' : '80%', 'maxHeight' : '100px','marginLeft' : '20px', 'marginTop' : '20px'}}className="articleInputComment" name="COMMENT" onChange={this.onChangeValue} value={this.state.COMMENT} placeholder='Tell us more' />
                    <Button style={{ 'height' : '100%' ,'marginLeft' : '20px', 'marginTop' : '20px'}} onClick={this.updateArticle}>등록</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispacthToProps = (dispatch) =>{
    return {
        updateArticle : bindActionCreators(putUpdateArticle,dispatch)
    }
}

export default connect(null,mapDispacthToProps)(UpdateEditor)