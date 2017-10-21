# react-router+webpack实现按需加载
基于withWebpackDevServer2，实现react资源的按需加载  
注: 
1. 这个demo是基于react-router4.0+的  
2. 结合[React-router 4 按需加载的实现方式及原理(Code Splitting)](https://segmentfault.com/a/1190000009539836), 介绍了react-router3.0按需加载的实现，和现有项目应用中一样，很好理解  

## 使用
打包出来的文件分了多个x.build.js文件，打开index.html，可在调试控制台看到文件是按需加载的  
当webpack-dev-server运行时，可在调试控制台看到文件是按需加载的  
```
yarn
npm run dev(运行)
npm run build(打包)
```

## 实现方法  
### router3  
Route的getComponent方法中使用webpack的require.ensure方法加载  
### router4  
getComponent被移除了，实现方式可以参考下面链接的讲解  
[React-router 4 按需加载的实现方式及原理(Code Splitting)](https://segmentfault.com/a/1190000009539836), 能理解项目router.js语法了  
1. Bundle.js实现
2. 通过import aContainer from 'bundle-loader?lazy!./containers/A'加载一个被bundle-loader预处理过的组件
3. 将组件再包一层
```javascript
import Bundle from '../utils/Bundle';
const A = (props) => (
  <Bundle load={aContainer}>
      //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
    {(Container) => <Container {...props}/>}
  </Bundle>
)
```
4. 在Router中使用组件

tips:  
在webpack进行bundle-loader统一配置后可以按通用方式加载组件
use和loader应该是互斥的，webpack2+推荐用use，loader用!分隔不太好看(参考[Webpack2 升级指南和特性摘要](https://segmentfault.com/a/1190000008181955))
```javascript
// webpack.dev.js的module字段
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader?cacheDirectory=true'],
          include: path.join(__dirname, 'src')
        },
        // 只对routes文件夹下的路由页面组件用bundle-loader?lazy预处理。顺序不能颠倒
        {
          test: /\.js$/,
          use: ['bundle-loader?lazy','babel-loader?cacheDirectory=true'],
          include: path.join(__dirname, 'src/routes')
        },]
    },
```

## 参考资料
[react-router + webpack 如何实现按需加载](https://www.vanadis.cn/2017/08/05/react-router-webpack-load-on-demand/)  
上面的文章讲得很清楚，这个demo主要也是自己练练手  
[React-router 4 按需加载的实现方式及原理(Code Splitting)](https://segmentfault.com/a/1190000009539836), 能理解项目router.js语法了  
其它参考资料:  
[dva2.0](https://github.com/sorrycc/blog/issues/48)  
[初探 React Router 4.0](http://www.jianshu.com/p/e3adc9b5f75c)  
[All About React Router 4](https://css-tricks.com/react-router-4/)  
[react-router2 迁移到 react-router4 关注点](https://github.com/gmfe/blog/issues/6)  
[React Router 4 简易入门](https://segmentfault.com/a/1190000010174260)  
[ReactTraining/react-router(github官方，有些例子老旧)](https://github.com/ReactTraining/react-router)  

## 源码参考
之前做项目源码分析的时候记录的:
```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'
// dva内容
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
	   // 指定主目录
      getIndexRoute (nextState, cb) {
		  // webpack  commonjs异步加载语法
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
		// 通配符，贪婪匹配，只能放最后（不然可能覆盖所有匹配）
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
```