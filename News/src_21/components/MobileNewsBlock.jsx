import React, {Component,PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class MobileNewsBlock extends Component{

    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }

    state = {
        news: null
    }

    componentDidMount () {
        const {type,count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
            })
    }

    render () {
        const {news} = this.state
        const {type} = this.props
        const showNews = !news
            ? <p>没有任何新闻</p>
            : (
                news.map((news,index) => (
                    <Card key={index} className="m_article list-item special_section clearfix">
                        <div className="m_article">
                            <Link to={`/news_detail/${news.uniquekey}`}>
                                <div className="m_article_img">
                                    <img src={news.thumbnail_pic_s} alt={news.title}/>
                                </div>
                                <div className="m_article_info">
                                    <div className="m_article_title">
                                        <span>{news.title}</span>
                                    </div>
                                    <div className="m_article_desc">
                                        <div className="m_article_desc_l">
                                            <span className="m_article_channel">{type}</span>
                                            <span className="m_article_time">{news.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </Card>
                ))
              )
        return (
            <div>
                {showNews}
            </div>
        )
    }
}