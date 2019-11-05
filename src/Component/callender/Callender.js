import React, { Component } from 'react';
import styled from 'styled-components';


const CallenderContainner =  styled.div`
    width:100%;
`
const Header = styled.div`
  display : flex;
`

const Title = styled.div`
  border : 1px solid #eee;
  height : 60px;
  flex-grow : 1;
  line-height : 60px;
  font-weight : bold;
  font-size : 1.5rem;
  text-align : center
`

const Left = styled.div`
  border : 1px solid #eee;
  width : 100px;
  height : 60px;
  line-height : 60px;
  text-align : center;
  &:hover {
    cursor : pointer;
  }
`

const Right = styled.div`
  border : 1px solid #eee;
  width : 100px;
  height  : 60px;
  line-height : 60px;
  text-align : center
  &:hover {
    cursor : pointer;
  }
`

const HeadItem = styled.div`
  flex : 1 0 14%;
  overflow : hidden;
  height : 40px;
  line-height : 40px;
  text-align : center;
  border : 1px solid #eee;
  box-sizing : border-box;
  color : black;
  background-color : ${props => props.background || 'white'};
`

const Item = styled.div`
  color : black;
  flex : 1 0 14%;
  overflow : hidden;
  min-heihgt : 100px;
  border : 1px solid #eee;
  padding : 8px;
  box-sizing:border-box;
  background-color : ${props => props.background || 'black'};
  &:hover{
    cursor : pointer;
  }
`

const Content = styled.div`
  display : flex;
  flex-wrap : wrap;
  
`

class Day extends Component{
  onClick = e => {
    if(this.props.onClick){
      this.props.onClick(this.props.day)
    }
  }

  render(){
    const { day,background,items } = this.props;

    const list = items.map((item)=>{
        return <div>{item}</div>
    })
    
    return(
      <Item background={background} onClick={this.onClick}>
          {day.date()}
          {list}
      </Item>

    )
  }
}


//Date 관련 라이브러리 moment 
class Callender extends Component {

  
  onPrevMonth = e=> {
    if(this.props.onClickPrevMonth){
        this.props.onClickPrevMonth();
    }
  }
  
  onNextMonth = e=> {
      if(this.props.onClickNextMonth){
          this.props.onClickNextMonth();
      }
  }
  renderHead = () =>{
    const { current } = this.props;

    const title =`${current.year()} - ${current.month()+1}`;
    return (
      <Header>
      <Left onClick={this.onPrevMonth}>
        이전
      </Left>
      <Title>
        {title}
      </Title>
      <Right onClick={this.onNextMonth}>
        다음
      </Right>
    </Header>
    )
  }

  renderDaysOfWeek = () =>{
    const titles = ['일','월','화','수','목','금','토'];

    const items = titles.map((title,index)=>{
      return <HeadItem key={index}>{title}</HeadItem>
    })
    return (
      <Content>
        {items}
      </Content>
    )

  }

  onItemClick = (selected) =>{
    if(this.props.onClickDate){
        this.props.onClickDate(selected);
    }
  }
  renderWeeks = () =>{
    const { current, today,selected, items} = this.props;
    // 선택된 월의 첫번째 날이 포함된 주의 일요일 
    const firstDay = current.clone().day(0).startOf('day');
    
    //다음달 첫번째 날 (1일)
    const firstDayOfNextMonth = current.clone().add(1,'month').startOf('day');
    
    const days = [];
    
    let index = firstDay;

    while(index.isBefore(firstDayOfNextMonth)){
      for(let i = 0; i < 7; i++){
        let background = "#FFF";

        if(index.isSame(selected)){
          background = "#95abbe";
        }else if(index.isSame(today)){
          background = "#dff0ea"
        }else if(index.month() !== current.month() ){
          background = "#DEDEDE";
        }
        
        const selectedItems = items.filter((item)=> item.selected.isSame(index)).map((item)=>item.content)
        //요게 중요한 듯 
        days.push(<Day items={selectedItems}key={index.format()} onClick={this.onItemClick} day={index} background={background}></Day>)

       index = index.clone().add(1,'days');
      }
    }
    return <Content>
      {days}
    </Content>;
  }
  render() {
    return (
      <CallenderContainner>
         {this.renderHead()}
         {this.renderDaysOfWeek()}
         {this.renderWeeks()}
      </CallenderContainner>
    )
  }
}

export default Callender;