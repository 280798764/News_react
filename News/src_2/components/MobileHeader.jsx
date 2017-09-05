import React ,{Component} from 'react'
import {Link} from 'react-router'
import {Modal,Tabs,Form,Input,Button,Icon,message} from 'antd'
import axios from 'axios'

import Logo from '../images/logo.png'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

class MobileHeader extends Component{

    state = {
        username: null,
        modalVisible: false
    }

    componentDidMount () {
        // 读取本地保存的数据, 如果有更新状态
        const username = localStorage.getItem('username')
        if(username) {
            this.setState({username})
        }
    }

    showModal = (isShow) => {
        this.setState({modalVisible: isShow})
    }

    handleSubmit = (isRegist,event) => {
        event.preventDefault()

        // 获取数据
        const {username,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue()
        const action = isRegist ? "register" : "login"

        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if(isRegist){
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        } else {
            url = `action=login&username=${username}&password=${password}`
        }

        axios.get(url)
            .then(response => {
                // 清除输入的数据
                this.props.form.resetFields()

                const result = response.data
                if (isRegist) {
                    // 注册
                    message.success('注册成功')

                } else {
                    // 登陆
                    if(!result){
                        message.error('登陆失败')
                    } else {
                        message.success('登陆成功')
                        // 读取返回的username/userId
                        const username = result.NickUserName
                        const userId = result.UserId
                        // 更新状态
                        this.setState({username})
                        // 保存username/userId
                        localStorage.setItem('username',username)
                        localStorage.setItem('userId',userId)
                    }

                }
                this.setState({modalVisible: false})
            })

    }

    render () {
        const {getFieldDecorator} = this.props.form
        const {username,modalVisible} = this.state

        const showUser = !username
            ? (
                <i>
                    <Icon type="setting" onClick={this.showModal.bind(this,true)}/>
                </i>
              )
            : (
                <Link to="/user_center">
                    <i>
                        <Icon type="user" />
                    </i>
                </Link>
              )

        return (
            <div id="mobileheader">
                <header>
                    <div>
                        <Link to="/">
                            <img src={Logo} alt="logo"/>
                            <span>ReactNews</span>
                        </Link>
                        {showUser}
                    </div>

                    <Modal title="用户中心"
                           visible={modalVisible}
                           okText="关闭"
                           onOk={this.showModal.bind(this,false)}
                           onCancel={this.showModal.bind(this,false)}>
                        <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                            <TabPane key="1" tab="登陆">
                                <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator("username")(
                                            <Input type="text" placeholder="请输入账号"></Input>
                                        )}
                                    </FormItem>

                                    <FormItem label="密码">
                                        {getFieldDecorator("password")(
                                            <Input type="password" placeholder="请输入密码"></Input>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">登陆</Button>
                                </Form>
                            </TabPane>
                            <TabPane key="2" tab="注册">
                                <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                    <FormItem label="账号">
                                        {getFieldDecorator("r_userName")(
                                            <Input type="text" placeholder="请输入账号"></Input>
                                        )}
                                    </FormItem>

                                    <FormItem label="密码">
                                        {getFieldDecorator("r_password")(
                                            <Input type="password" placeholder="请输入密码"></Input>
                                        )}
                                    </FormItem>

                                    <FormItem label="确认密码">
                                        {getFieldDecorator("r_confirmPassword")(
                                            <Input type="password" placeholder="请再次输入密码"></Input>
                                        )}
                                    </FormItem>

                                    <Button type="primary" htmlType="submit">注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>

                </header>
            </div>

        )
    }
}
export default Form.create()(MobileHeader)