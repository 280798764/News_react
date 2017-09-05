import React ,{Component} from 'react'
import {Row,Col,Tabs,Card,BackTop} from 'antd'
import NewsImageBlock from "./news_image_block";
import NewsComments from './news_comments'
import axios from 'axios'

const TabPane = Tabs.TabPane
export default class NewsDetail extends Component{

    state = {
        news: {}
    }
    componentDidMount () {
        const {uniquekey} = this.props.params
        this.showNewsDetail(uniquekey)
    }

    componentWillReceiveProps (newProps) {
        this.showNewsDetail(newProps.params.uniquekey)
    }

    showNewsDetail (uniquekey) {
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
                document.title = news.title
            })
    }

    render () {
        const {news} = this.state
        const {uniquekey} = this.props.params
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className="container">
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                        <NewsComments uniquekey={uniquekey}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <Tabs>
                           <TabPane key="1" tab="相关新闻">
                                <NewsImageBlock type="top" count={40} cardTitle="相关新闻" cardWidth="100%" imageWidth="150px"></NewsImageBlock>
                           </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop></BackTop>
            </div>
        )
    }
}
