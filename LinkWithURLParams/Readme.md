## 功能
![]()
URL传参，Home为动态，About为静态
传参地址栏可见
## 使用
```
yarn
npm run dev(运行)
npm run build(打包)
```
## 传参方式
```javascript
 <li><Link to={`/${clickHomeCount}`}><button onClick={this.addHome}>Home</button></Link></li>
 <li><Link to="/about/vonxq/22">About</Link></li>

<Route exact path="/" component={Home}/>
<Route exact path="/:count" component={Home}/>
<Route exact path="/about" component={About}/>
<Route exact path="/about/:name/:age" component={About}/>

// 取值props.match.params.name名字
<h2>Home 这是第{props.match.params.count}次点击home了</h2>


```
## 问题
1. Link模式如何绑定些钩子函数?
直接在link内容里面加个组件，绑个on...时间就行了
2. 另一种push history的模式如何实现？
具体在LinkWithObjectParameter里实现
3. URL传参冲突如何处理(如<Link to="/about" />可以是根目录下传的参数为about，也可以是/about页面)
  Route会显示所有已匹配的内容，从短到长依次显示
  exact会做到精确匹配(路径、参数个数与Route的path一致的才会匹配),多个匹配也是依次显示
4. 页面内部跳转没问题，一刷新就说找不到(Cannot GET ...)???
[React-Router browserHistory浏览器刷新出现页面404解决方案](https://www.thinktxt.com/react/2017/02/26/react-router-browserHistory-refresh-404-solution.html)
  BrowserRouter的问题，这个是真实地址所以需要真实的服务器(Nginx、node)，具体配置参考上面链接
  HashRouter不存在此问题，故此网页改成了HashRouter
5. 箭头函数报语法错误
ES7内容，需安装babel-preset-stage-0并添加相应preset
