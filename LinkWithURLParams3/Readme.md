## 功能
![效果图](https://github.com/vonxq/react-router-demo/blob/master/resources/img/routeUrlPrams.gif?raw=true)

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
  彻底解决多个匹配问题:
  > <Switch>包裹Route，内部若有多条 <Route> 或 <Redirect>匹配此url，只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。
    <Switch> is unique in that it renders a route exclusively. In contrast, every <Route> that matches the location renders inclusively.

4. 页面内部跳转没问题，一刷新就说找不到(Cannot GET ...)???
[React-Router browserHistory浏览器刷新出现页面404解决方案](https://www.thinktxt.com/react/2017/02/26/react-router-browserHistory-refresh-404-solution.html)
  BrowserRouter的问题，这个是真实地址所以需要真实的服务器(Nginx、node)，具体配置参考上面链接
  HashRouter不存在此问题，故此网页改成了HashRouter
5. 箭头函数报语法错误
ES7内容，需安装babel-preset-stage-0并添加相应preset
6. 多次点击同一链接会报错
开发环境下的错误，可直接忽视
> github相关问答
[Warning: You cannot PUSH the same path using hash history](https://github.com/ReactTraining/react-router/issues/4467)
The warning is there just to let you know that when you're using hash history, you can't actually PUSH the same path; the browser won't add anything to the history stack.
But you should only get this warning in development. If you generate your production build correctly (using NODE_ENV=production) you shouldn't see this warning in production.