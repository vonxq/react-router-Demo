## 使用
```
yarn
npm run build(打包)
打开out/index.html查看结果
```

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