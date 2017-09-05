import React , {Component} from 'react'
import {Tabs,Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'


const TabPane = Tabs.TabPane

export default class MobileUserCenter extends Component{

    state = {
        comment: null,
        collection: null
    }

    componentDidMount () {
        const userId = localStorage.getItem('userId')
        // 收藏列表
        const url1 = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url1)
            .then(response => {
                const collection = response.data
                this.setState({collection})
            })

        // 評論列表
        const url2 = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url2)
            .then(response => {
                const comment = response.data
                this.setState({comment})
            })

    }

    render () {
        const {collection,comment} = this.state
        // 收藏列表
        const showCollections = !collection
            ? <p>還沒有任何收藏，快去收藏一些吧。</p>
            : (
                collection.map((collection,index) => (
                    <Card key={index} title={collection.uniquekey}
                          extra={<Link to={`/news_detail/${collection.uniquekey}`}>查看</Link>}>
                        <p>{collection.Title}</p>
                    </Card>
                ))
              )
        // 評論列表
        const showComments = !comment
            ? <p>還沒有任何評論，快去發表你的評論吧。</p>
            : (
                comment.map((comment,index) => (
                    <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                          extra={<Link to={`/news_detail/${comment.uniquekey}`}>查看</Link>}>
                        <p>{comment.Comments}</p>
                    </Card>
                ))
            )
        return (
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                        {showCollections}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                        {showComments}
                    </TabPane>
                    <TabPane tab="头像设置" key="3"></TabPane>
                </Tabs>
            </div>
        )
    }
}
