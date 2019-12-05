import React, { Component } from 'react';
import { Button, Form, TextArea} from 'semantic-ui-react';

import { putGroupUpdateArticle } from '../../Store/ACTIONS/Group';
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
class GroupUpdateArticle extends Component {

    constructor(props){
        super(props);
        this.state = {
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
        const {COMMENT,IMAGES} = this.state;
        const {postKey,image,setMode,where} = this.props;
        this.props.putGroupUpdateArticle(postKey,where,image,IMAGES[0],COMMENT,setMode);
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
        putGroupUpdateArticle : bindActionCreators(putGroupUpdateArticle,dispatch)
    }
}

export default connect(null,mapDispacthToProps)(GroupUpdateArticle)