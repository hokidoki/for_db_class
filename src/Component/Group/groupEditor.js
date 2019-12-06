import React, { Component } from 'react';
import { Button, Form, TextArea,Checkbox } from 'semantic-ui-react';

// import { postArticle } from '../../Store/ACTIONS/Article';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { postGroupArticle } from '../../Store/ACTIONS/Group';

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
    background-image : url(${props => props.src});
    background-repeat : no-repeat;
    background-position : center center;
    &:hover{
        cursor : pointer;
    }
`
class Editor extends Component {
    state = {
        COMMENT: "",
        IMAGES: [],
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addArticle = () => {
        const {  COMMENT, IMAGES } = this.state;
        const { match } = this.props;
        this.props.postGroupArticle(match.params.where,COMMENT,IMAGES[0]);
        this.setState({
            COMMENT: "",
            IMAGES: [],
        })
    }

    onImageChage = (e) => {
        if (!(e.target.files && e.target.files.length && this.state.IMAGES.length <= 1)) {
            return;
        }

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

    onHandleChane = () => {
        this.refs.image.click();
    }

    onDeleteImage = index => {
        this.setState({
            IMAGES: this.state.IMAGES.filter((item, i) => i === index)
        })
    }

    changeSecretMode= ()=>{
        this.setState({
            SECRET : this.state.SECRET === 0 ? 1 : 0
        })
    }
    render() {
        const { IMAGES, } = this.state;
        const list = IMAGES.map((image, index) => {
            return (
                <Preview
                    key={index}
                    src={image.src}
                    onClick={() => {
                        this.onDeleteImage(image)
                    }}
                ></Preview>
            )
        })

        const modeStyle = this.state.SECRET === 0 ?{
            'backgroundColor' : 'gray'
        } : {
            'backgroundColor' : 'gray'
        };
        return (
            <div className="Editor" style={modeStyle} >
                <div className="EditorInputBox">
                    <div className="imageDiv">
                        <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChage} />
                        {list}
                    </div>
                    <div className="whatEatInput">
                        <div className="imageButton" id="forGroupArticleEditor">
                            <label id="imageInputButton" style={{ 'backgroundColor' : 'none', 'marginLeft': "7px", 'width': '100px' }} onClick={this.onHandleChane}>이미지 추가</label>
                            {/* <Checkbox style={{'marginLeft': "7px",'marginTop' : '5px','color' : 'snow'}}label="cheat mode" onChange={this.changeSecretMode}></Checkbox> */}
                            {/* <Button style={{ 'marginLeft': "7px", 'width': '100px' }} classNmae={this.state.SECRET === 0 ? "toSecret" : "toUnSecret"} name="SECRET" onClick={this.changeSecretMode}>비리 모드</Button> */}
                            {/* <button style={{ 'height': '38px', 'marginLeft': '0', 'marginTop': '-20px' }} id="addArticleButton"onClick={this.addArticle}>등록</button> */}
                            <button id="addArticleButton"style={{'padding':'0','height' : '50px'}}className="changeInfoButton"onClick={this.addArticle}>글쓰기</button>
                        </div>
                    </div>
                </div>
                <div className="articleInputDiv">
                        <textarea style={{  'maxHeight': '38px' }} className="articleInputComment" name="COMMENT" onChange={this.onChangeValue} value={this.state.COMMENT} placeholder='Tell us more' />
                </div>
            </div>
        )
    }
}


const mapDispacthToProps = (dispatch) => {
    return {
        postGroupArticle: bindActionCreators(postGroupArticle, dispatch)
    }
}

export default connect(null, mapDispacthToProps)(Editor)