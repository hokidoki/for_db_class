import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { Image, Button} from 'semantic-ui-react';
import '../style/myInfoPage.css';

import {bindActionCreators} from 'redux';

import { changeInfo,getWhoFollowMe } from '../Store/ACTIONS/Account';

import styled from 'styled-components';

const InvisibleUploadButton = styled.input`
    display : none;
`

class MyInfoPage extends Component {

    constructor(props){

        super(props);
        const {NAME ,PROFILE_IMAGE,JOB, CURRENT_WEIGHT,GOAL_WEIGHT,COMMENT } = this.props.USER;
        console.log(this.props);
        this.state = {
            IMAGES : [{
                src : PROFILE_IMAGE ? PROFILE_IMAGE :'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
            }],
            NAME : NAME ? NAME  : "",
            JOB : JOB ? JOB : "",
            CURRENTWEIGHT : CURRENT_WEIGHT ? CURRENT_WEIGHT : "",
            GOALWEIGHT : GOAL_WEIGHT ? GOAL_WEIGHT : "",
            COMMENT : COMMENT ? COMMENT : "",
        }
    }

    componentDidMount(){
        this.props.getWhoFollowMe()
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
    changeInfo = ()=>{
        const {NAME, JOB, CURRENTWEIGHT, GOALWEIGHT, COMMENT,IMAGES} = this.state;
        const { PROFILE_IMAGE } = this.props.USER;
        this.props.infoChange(NAME,JOB,CURRENTWEIGHT,GOALWEIGHT,COMMENT,PROFILE_IMAGE,IMAGES[0]);
    }
    onChangeValue = (e)=>{
        if((e.target.name === "BIRTH" || e.target.name === "CURRENTWEIGHT" || e.target.name === "GOALWEIGHT" ) && isNaN(e.target.value) === true){
            alert("숫자만 입력해주세요");
            return;
        }

        this.setState({
            [e.target.name] : e.target.value
        })

    }



    render(){
        const whoFollow = this.props.WhoFollow.whoFollowMe ? this.props.WhoFollow.whoFollowMe : [];
        const whoUnFollow = this.props.WhoFollow.whoUnFollowMe ? this.props.WhoFollow.whoUnFollowMe : [];
        console.log(whoUnFollow)
        console.log(whoFollow)
        return(
            <div className="MyinfoPage" style={{'overflowY' : 'auto'}} >
                <h1>회원정보 수정 </h1>
                <div className="myinfoContainer">
                    <div className="myinfoDiv">
                        <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChage} />
                </div>
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDivimage">
                        이미지
                    </div> 
                    <div className="myinfoTextboxLabelDiv">
                    <Image
                        className ="userIconPrivew"
                        style = {{'width' : '60px' , 'height' : '60px', 'borderRadius: ' : '100px',}}
                        src= {this.state.IMAGES[0].src}
                        onClick = {this.onDeleteImage}
                    /> 
                    </div>
                    <div className="myinfoTextboxLabelDivimageLabel">
                        <label id="myInfoImageButton" className="myInfoimageChangeButton" onClick={this.onHandleChane}>이미지 추가</label>
                    </div>
                </div>
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDiv">
                        별명
                    </div> 
                    <div className="myinfoTextboxDiv">
                    <input type="text" className="myinfoTextBox"onChange={this.onChangeValue} name="NAME" value={this.state.NAME} />
                    </div>
                </div>
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDiv">
                         직업
                    </div> 
                    <div className="myinfoTextboxDiv">
                        <input type="text" className="myinfoTextBox"onChange={this.onChangeValue} name="JOB" value={this.state.JOB} />
                    </div>
                </div>    
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDiv">
                        현재체중
                    </div> 
                    <div className="myinfoTextboxDiv">
                    <input type="text"  className="myinfoTextBox"onChange={this.onChangeValue} name="CURRENTWEIGHT" value={this.state.CURRENTWEIGHT} />
                    </div>
                </div>
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDiv">
                        목표체중
                    </div> 
                    <div className="myinfoTextboxDiv">
                    <input type="text"  className="myinfoTextBox"onChange={this.onChangeValue} name="GOALWEIGHT" value={this.state.GOALWEIGHT} />
                    </div>
                </div>
                <div className="myinfoTextboxContainer">
                    <div className="myinfoTextboxLabelDiv">
                        코멘트
                    </div> 
                    <div className="myinfoTextboxDiv">
                    <input type="text" className="myinfoTextBox"onChange={this.onChangeValue} name="COMMENT" value={this.state.COMMENT} />
                    </div>
                </div>                        
                <button className="changeInfoButton"onClick={this.changeInfo}>변경</button>
                </div>
                <WhoFollowMe whoFollowMe={whoFollow} whoUnfollowMe={whoUnFollow}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        infoChange : bindActionCreators(changeInfo,dispatch),
        getWhoFollowMe : bindActionCreators(getWhoFollowMe,dispatch)
    }
  }

const mapStateToProps = (state)=>{
    return {
        USER : state.USER.sign_in.user,
        WhoFollow : state.SEARCH.search.whoFollow
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyInfoPage));

class WhoFollowMe extends Component{

    static defaultProps = {
        whoFollow : [],
        whoUnfollowMe : [],
    }

    render(){
        const {whoFollowMe, whoUnfollowMe} = this.props;
        const followAcconnt = whoFollowMe.map((item)=>{
            const imageSrc = item.PROFILE_IMAGE ? item.PROFILE_IMAGE :  'https://react.semantic-ui.com/images/avatar/small/stevie.jpg';
            return (
                <div className="followUnfollowRow">
                    <div className="followUnfollowRowImage">
                        <Image size="mini" src={imageSrc}></Image>
                    </div>
                    <div className="followUnfollowRowID">
                        {item.ID}
                    </div>
                    <div className="followUnfollowRowNAME">
                        {item.NAME}
                    </div>
            </div>
            )
        })
            const unfollowAcconnt = whoUnfollowMe.map((item)=>{
                const imageSrc = item.PROFILE_IMAGE ? item.PROFILE_IMAGE :  'https://react.semantic-ui.com/images/avatar/small/stevie.jpg';
                return (
                    <div className="followUnfollowRow">
                    <div className="followUnfollowRowImage">
                        <Image size="mini" src={imageSrc}></Image>
                    </div>
                    <div className="followUnfollowRowID">
                        {item.ID}
                    </div>
                    <div className="followUnfollowRowNAME">
                        {item.NAME}
                    </div>
            </div>
                )
        });
        return(
            <div className="whoFollowTable">
                <div className="whoFollowTableHeader">
                    <div className="whoFollowTableHeaderColumn">팔로우한 사람!</div>
                    <div className="whoFollowTableHeaderColumn">팔로우하지 않은 사람!</div>
                </div>
                <div className="whoFollow">
                    <div className="whoFollowTableHeaderColumnFollow">
                        {followAcconnt}
                    </div>
                    <div className="whoFollowTableHeaderColumnUnfollow">
                        {unfollowAcconnt}
                    </div>
                </div>
            </div>
        )
    }
}