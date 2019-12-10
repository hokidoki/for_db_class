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
        this.props.putGroupUpdateArticle(postKey,where,image,IMAGES[0].src,COMMENT,setMode);
    }

    onImageChage = (e) =>{
        if(!(e.target.files && e.target.files.length && this.state.IMAGES.length <= 1)){
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();
        if(file.size > 1024 * 1024 *5){
            alert("파일 크기는 5mb 이하입니다.");
            return;
        }
        reader.readAsDataURL(file);

        reader.onload = ()=>{
            this.setState({
                IMAGES : [
                    {
                        file : file,
                        src : reader.result
                    },
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
            IMAGES : [{
                file : "",
                src : null
            }]
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
            <div>
            <div className="EditorInputBox">
                    <div className="imageDiv">
                        <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChage} />
                        {
                            this.state.IMAGES[0].src ? list : null

                        }
                    </div>
                    <div className="whatEatInput">
                        <div className="imageButton" id="forGroupArticleUpdateEditor">
                            <label id="imageInputButton" style={{ 'backgroundColor' : 'none', 'marginLeft': "7px", 'width': '100px' }} onClick={this.onHandleChane}>이미지 추가</label>
                            {/* <Checkbox style={{'marginLeft': "7px",'marginTop' : '5px','color' : 'snow'}}label="cheat mode" onChange={this.changeSecretMode}></Checkbox> */}
                            {/* <Button style={{ 'marginLeft': "7px", 'width': '100px' }} classNmae={this.state.SECRET === 0 ? "toSecret" : "toUnSecret"} name="SECRET" onClick={this.changeSecretMode}>비리 모드</Button> */}
                            {/* <button style={{ 'height': '38px', 'marginLeft': '0', 'marginTop': '-20px' }} id="addArticleButton"onClick={this.addArticle}>등록</button> */}
                            <button id="addArticleButton"style={{'padding':'0','height' : '50px'}}className="changeInfoButton"onClick={this.updateArticle}>변경하기</button>
                        </div>
                    </div>
                </div>
                <div className="articleInputDiv">
                        <textarea style={{  'minHeight': '100px','maxHeight': '100px' }} className="articleInputComment" name="COMMENT" onChange={this.onChangeValue} value={this.state.COMMENT} placeholder='Tell us more' />
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