import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
class BasicExample extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      clickHomeCount: 0,
      clickAboutCount: 0,
    }
  }
  addHome = () => {
    let { clickHomeCount } = this.state
    clickHomeCount++
    this.setState({
      clickHomeCount
    })
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
          <li><Link to={`/${clickHomeCount}`}><button onClick={this.addHome}>Home</button></Link></li>
          <li><Link to="/about/vonxq/22">About</Link></li>
        </ul>
    
        <hr/>
  
        <Route exact path="/" component={Home}/>
        <Route exact path="/:count" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/about/:name/:age" component={About}/>
      </div>
    </Router>)
  }
}

const Home = (props) => (
  <div>
    <h2>Home 这是第{props.match.params.count}次点击home了</h2>
  </div>
)

const About = (props) => (
  <div>
    <h2>About- 我是{props.match.params.name}-我今年{props.match.params.age}</h2>
  </div>
)

export default BasicExample