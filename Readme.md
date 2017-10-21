# React-router的一些简单实例
总结一下学习的内容。
## 更新记录
1021 更新react-router4+webpack实现按需加载,loadOnDemand6文件夹

## 通用package说明


## 参考资料

[dva2.0](https://github.com/sorrycc/blog/issues/48)
[初探 React Router 4.0](http://www.jianshu.com/p/e3adc9b5f75c)
[All About React Router 4](https://css-tricks.com/react-router-4/)
[react-router2 迁移到 react-router4 关注点](https://github.com/gmfe/blog/issues/6)
[React-router 4 按需加载的实现方式及原理(Code Splitting)](https://segmentfault.com/a/1190000009539836), 能理解项目router.js语法了
[React Router 4 简易入门](https://segmentfault.com/a/1190000010174260)
[React Router 4路由配置](https://segmentfault.com/a/1190000010472619)
[ReactTraining/react-router(github官方，有些例子老旧)](https://github.com/ReactTraining/react-router)
## 常见问题解答
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


## tips
有jsx语法的js文件中，必须要import进React
### BrowserRouter不能本地打开
react-router4.0把history整合进了Router组件，可直接使用以下方式创建Route，各Router区别与下同
```javascript
import { BrowserRouter } from 'react-router'
render (
  <BrowserRouter>
    // ... 
  </BrowserRouter>
)
```
[更新对React Router的History的认识](http://levy.work/2017-01-09-update-knowledge-of-react-router-history/)
简洁说明:
1. browserHistory url干净，使用习惯和其他网页一致，但必须要通过http服务器访问
2. createMemoryHistory 浏览器地址不会变
3. hashHistory url不干净，带#
4. 使用方式(旧)
```javascript
import { browserHistory } from 'react-router'
// ...
render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```

## 依赖
> RR4 本次采用单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包，分别是：
react-router: React Router 核心
react-router-dom 用于 DOM 绑定的 React Router,比react-router多出了 <Link> <BrowserRouter> 这样的 DOM 类组件
react-router-native 用于 React Native 的 React Router
react-router-redux: React Router 和 Redux 的集成
react-router-config 静态路由配置的小助手

## 参考
[初探 React Router 4.0](http://www.jianshu.com/p/e3adc9b5f75c)
