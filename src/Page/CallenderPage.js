import React, { Component } from 'react';
import styled from 'styled-components';
import Callender from '../Component/callender/Callender'
import * as moment from 'moment';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { changeSelectDate } from '../Store/ACTIONS/Callender';
import {getArticleThisMonth} from '../Store/ACTIONS/Article';
const Containner = styled.div`
  margin : 0 auto;
  margin-top : 15px;
  width : ${props => props.width || '70%'};
  display : flex;
`

const Content = styled.div`
  width : 100%;
`

// const SideContent = styled.div`
//   width : 30%;
// `

//Date 관련 라이브러리 moment 
class CallenderPage extends Component {

  state = {
    items : [],
    current: moment().date(1),
    today: moment().startOf('day'),
    selected: null,
  }
  componentDidMount(){
    const {user} = this.props;
    const year = moment().year();
    const month = moment().month();
    const day = moment().date();
    const dateType = `${year}-${month}-${day}`;    
    this.props.getArticleThisCallender(user.user.ID);
    this.props.history.push(`/main?ID=${this.props.user.user.ID}&DATE=${dateType}`);
    
  }


  onClickNextMonth = () => {
    this.setState({
      current: this.state.current.clone().add(1, 'month')
    })
  }

  onClickPrevMonth = () => {
    this.setState({
      current: this.state.current.clone().add(-1, 'month')
    })
  }

  
  onClickDate = (selected) => {
    this.setState({
      selected
    })
    const select = selected.clone().add(1,'day');
    this.props.changeSelectDate(select);
  }

  onAdd = (selected,content) =>{
    this.setState({
      items : [...this.state.items,{
        selected,
        content
      }]
    })
  }
  render() {
      const { current, today, selected,items } = this.state;
      // const selectedItems = items.filter(item=>item.selected.isSame(selected)).map((item) => item.content);
      return (
        <Containner>
          <Content>
            <Callender items={items} onClickNextMonth ={this.onClickNextMonth} onClickPrevMonth={this.onClickPrevMonth} onClickDate={this.onClickDate} current={current} today={today} selected={selected} />
          </Content>
          {/* <SideContent>
            <SceduleBoard selected={selected} onAdd={this.onAdd} items={selectedItems}></SceduleBoard>
          </SideContent> */}
        </Containner>
      )
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      changeSelectDate : (selected) =>{dispatch(changeSelectDate(selected))},
      getArticleThisCallender : (ID) =>{dispatch(getArticleThisMonth(ID))}
    }
  }

  export default connect(null,mapDispatchToProps)(withRouter(CallenderPage));