import React, { Component } from 'react'
import Editor from '../Component/callender/Editor'
import ArticleCard from '../Component/Article/ArticleCard';

export default class ArticlePage extends Component {
    render() {
        return (
            <div className="FriendsListPage">
                <Editor></Editor>
                <ArticleCard></ArticleCard>
            </div>
        )
    }
}
