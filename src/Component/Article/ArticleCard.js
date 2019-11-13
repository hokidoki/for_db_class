import React,{Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class ArticleCard extends Component {

    static defaultProps = {
        writer : "dummy writer",
        contents : "contents",
        date : "2019-09-01",
        image : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
    }

    render(){
        return(
          <div className="articleCard">
            <Image src={this.props.image} size="medium"></Image>
            <div className="commentInputDiv">
              <input type="text"  className="commentInput" placeholder="댓글을 입력해주세요"/>
            </div>
          </div>
        )
    }
}

export default ArticleCard