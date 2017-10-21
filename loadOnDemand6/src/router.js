import React from 'react'
// import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom'
// import { Route } from 'react-router'
// 设置trunk文件的名字  the basename of the resource
import aContainer from './routes/content'
import bContainer from './routes/home'
import cContainer from './routes/about'
// 未配置webpack的bundle-loader则需要一下方式加载页面组件
// import aContainer from 'bundle-loader?lazy!./routes/content'
// import bContainer from 'bundle-loader?lazy!./routes/home'
// import cContainer from 'bundle-loader?lazy!./routes/about'
import Bundle from './Bundler'

const A = () => (
  <Bundle load={aContainer}>
    {Component => <Component />}
  </Bundle>
)
const B = () => (
  <Bundle load={bContainer}>
    {Component => <Component />}
  </Bundle>
)
const C = () => (
  <Bundle load={cContainer}>
    {Component => <Component />}
  </Bundle>
)
export default function () {
  // 用来判断本地浏览器是否支持刷新
  const supportsHistory = 'pushState' in window.history;
  return (
    <Router forceRefresh={!supportsHistory} keyLength={12}>
      <div>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/c">about</Link></li>
          <li><Link to="/a">content</Link></li>
        </ul>
      <hr/>    
        <Route exact path="/" component={B} />
        <Route path="/a" component={A} />
        <Route path="/c" component={C} />
      </div>
    </Router>

  );
}
