import React from 'react'
// 无服务器情况下不可用
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
class BasicExample extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      clickHomeCount: 0,
    }
  }

  render () {
    const { clickHomeCount } = this.state
    const toHome = {
        pathname: '/',
        search: '?sort=name',
        hash: '#the-hash',
        state: { clickHomeCount }
    }
    return (<Router>
      <div>
        <ul>
          <li><Link to="/about/22 ">Home</Link></li>
          <li><Link to="/about/vonxq/22">About</Link></li>
        </ul>
    
        <hr/>
  
        <Route exact path="/" component={Home}/>
        <Route exact path="/:sayhi/:ha" component={Home}/>
        <Route path="/about" component={About}/>
        <Route exact path="/about/:name/:age" component={About}/>
      </div>
    </Router>)
  }
}

const Home = (props) => (
  <div>
    <h2>Home<br/> {props.match.params.sayhi} <br/> {props.match.params.ha}</h2>
  </div>
)

const About = (props) => (
  <div>
    <h2>About \n 我是{props.match.params.name}\n 我今年{props.match.params.age}</h2>
  </div>
)

export default BasicExample