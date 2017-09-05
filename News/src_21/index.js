import React from 'react'
import {render} from 'react-dom'
import {Router,Route,IndexRoute,hashHistory} from 'react-router'

import MediaQuery from 'react-responsive'

import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'


import MobileApp from './components/MobileApp'
import MobileContainer from './components/MobileContainer'
import MobileNewsDetail from './components/MobileNewsDetail'
import MobileUserCenter from './components/MobileUsercenter'


render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={NewsContainer}></IndexRoute>
                    <Route path="/news_detail/:uniquekey" component={NewsDetail}></Route>
                    <Route path="/user_center" component={UserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path="/" component={MobileApp}>
                    <IndexRoute component={MobileContainer}></IndexRoute>
                    <Route path="/news_detail/:uniquekey" component={MobileNewsDetail}></Route>
                    <Route path="/user_center" component={MobileUserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>
    </div>
),document.getElementById('root'))
/**/