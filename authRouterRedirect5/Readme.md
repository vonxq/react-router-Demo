## 功能
使用React-router4.0+实现一个简单认证
修改index.js的import App from 'xxxx'来源可实现加载不同的界面
HashRouter可本地访问
源码来自[REACT TRAINING / REACT ROUTER官方示例](https://reacttraining.com/react-router/web/example/auth-workflow)
## 使用
```
yarn
npm run dev(运行)
npm run build(打包)
```
## 代码说明
重定向实现:
```javascript
// PrivateRoute界面若未认证则重定向到Login界面
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

// 若未认证则提示登录，否则重定向回之前跳转回的页面
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    // 条件渲染
    return (
      redirectToReferrer ?
       <Redirect to={from}/> :      
       <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
```