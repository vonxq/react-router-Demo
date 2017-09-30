# React-router的一些简单实例
总结一下学习的内容。
[dva2.0](https://github.com/sorrycc/blog/issues/48)
[初探 React Router 4.0](http://www.jianshu.com/p/e3adc9b5f75c)
[All About React Router 4](https://css-tricks.com/react-router-4/)
[react-router2 迁移到 react-router4 关注点](https://github.com/gmfe/blog/issues/6)
[React-router 4 按需加载的实现方式及原理(Code Splitting)](https://segmentfault.com/a/1190000009539836), 能理解项目router.js语法了
[React Router 4 简易入门](https://segmentfault.com/a/1190000010174260)
[ReactTraining/react-router(github官方，有些例子老旧)](https://github.com/ReactTraining/react-router)
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
4. 使用方式（旧）:
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
