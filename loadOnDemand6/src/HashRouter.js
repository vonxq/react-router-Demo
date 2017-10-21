import React from 'react'
// 本地条件不能使用BrowserRouter
import {
  Route,
  Link,
  HashRouter
} from 'react-router-dom'

const routes = [
  {
    
  },
]

const BasicExample = () => (
  <HashRouter routes = {routes}/>
)

export default BasicExample