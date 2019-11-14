import React,{Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


class ArticleCard extends Component {

    static defaultProps = {
        writer : "dummy writer",
        breakFast : "meal",
        lunch : "ham",
        dinner : "noodle",
        contents : "contents",
        date : "2019-09-01",
        image : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
    }

    render(){
        return(
          <div className="articleCard">
            <div>
              {this.props.writer}
              <label>{this.props.date}</label>
            </div>
            <div className="articleImageDiv">
              <Image src={this.props.image} size="medium" style={{'display' : 'inlineBlock'}}></Image>
              <div className="articleSection">
                <div>{this.props.breakFast}</div>
                <div>{this.props.lunch}</div>
                <div>{this.props.dinner}</div>
              </div>
            </div>
            <div className="commentInputDiv">
              <input type="text"  className="commentInput" placeholder="댓글을 입력해주세요"/>
            </div>
          </div>
        )
    }
}

class Comment extends Component{
  

  render(){
    return(
      <div>

      </div>
    )
  }
}


export default ArticleCard