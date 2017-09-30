## 功能
![效果图](https://github.com/vonxq/react-router-demo/blob/master/resources/img/routeUrlPrams.gif?raw=true)

通过state传参，参数记录点击次数，动态改变
传参地址栏不可见
分query方法和state方法
query和state无区别????均不可见，
## 使用
```
yarn
npm run dev(运行)
npm run build(打包)
```
## 传参方式
```javascript
    const toAbout = {
      pathname: '/about',
      search: `?clickAboutCount=${clickAboutCount}`,
      hash: '#the-hash',
      state: { clickAboutCount, 
        age: 22,
        name: "vonxq"
      }
    }
 <li><Link to={toAbout}>About</Link></li>

<Route exact path="/about" component={About}/>

// 取值props.match.params.name名字
<h2>About- { props.location.state ? `我是${props.location.state.name}-我今年${props.location.state.age}<br/> 这是第${props.location.state.clickAboutCount}次点击About了`: "暂无参数"}</h2>
```
## 问题
1. 一直点击Home的话页面不会刷新(state已经变了)
参考[react-router4 路由变了页面没变](https://segmentfault.com/q/1010000009479933)
2. query和state区别???
看官方API Link的to对象共有四个参数，如下
```javascript
<Link to={{
  pathname: '/courses',
  search: '?sort=name',// 紧跟路径显示，地址栏可见
  hash: '#the-hash',// 显示在路径最后面
  state: { fromDashboard: true }// 地址栏不可见，只有state改变url不变页面不更新
}}/>
```
2. 另一种push history的模式如何实现？