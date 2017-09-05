import React ,{Component} from 'react'
import {Row,Col,Tabs,Card,Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane

export default class UserCenter extends Component{

    state = {
        collection: null,
        comments: null,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    componentDidMount () {

        // 收藏列表
        const userId = localStorage.getItem('userId')
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const collection = response.data
                this.setState({collection})
            })

        // 评论列表
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    // 显示预览图片(显示 modal)
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // 选择上传图片
    handleChange = ({ fileList }) => this.setState({ fileList })

    render () {
        const {collection,comments} = this.state
        const myCollectionList = collection
            ? (
                collection.map((collection,index) => (
                    <Card key={index} title={collection.uniquekey}
                          extra={<Link to={`/#/news_detail/${collection.uniquekey}`}>查看</Link>}>
                        <p>{collection.Title}</p>
                    </Card>
                ))
              )
            :  <p>您还没有收藏任何的新闻，快去收藏一些新闻吧。</p>

        const myCommentsList = comments
            ? (
                comments.map((comment,index) => (
                    <Card key={index} title={`于 ${comment.datatime} 评论了文章 ${comment.uniquekey}`}
                          extra={<Link to={`/#/news_detail/${comment.uniquekey}`}>查看</Link>}>
                        <p>{comment.UserName}</p>
                    </Card>
                ))
              )
            : <p>您还没有任何评论。</p>

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane key="1" tab="我的收藏列表">
                                {myCollectionList}
                            </TabPane>
                            <TabPane key="2" tab="我的评论列表">
                                {myCommentsList}
                            </TabPane>
                            <TabPane key="3" tab="头像设置">
                                <div className="clearfix">
                                    <Upload
                                        action="http://jsonplaceholder.typicode.com/photos"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}>
                                        {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
