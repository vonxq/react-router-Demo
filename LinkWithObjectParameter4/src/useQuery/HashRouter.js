import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
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
  addAbout = () => {
    let { clickAboutCount } = this.state
    clickAboutCount++
    this.setState({
      clickAboutCount
    })
  }
  render = () => {
    const { clickAboutCount, clickHomeCount } = this.state
    const toHome = {
        pathname: '/',
        query: { clickHomeCount }
    }
    const toAbout = {
      pathname: '/about',
      query: { clickAboutCount, 
        age: 22,
        name: "vonxq"
      }
    }
    return (<Router>
      <div>
        <ul>
          <li><Link to={toHome}><button onClick={this.addHome}>Home</button></Link></li>
          <li><Link to={toAbout}><button onClick={this.addAbout}>About</button></Link></li>
        </ul>
        <hr/>
        {/* Switch只选择第一个匹配的 */}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </div>
    </Router>)
  }
}

const Home = (props) => (
  <div>
    <h2>Home {props.location.query ? `这是第${props.location.query.clickHomeCount}次点击home了` : "暂无参数"} </h2>
  </div>
)

const About = (props) => (
  <div>
    <h2>About- { props.location.query ? `我是${props.location.query.name}-我今年${props.location.query.age}<br/> 这是第${props.location.query.clickAboutCount}次点击About了`: "暂无参数"}</h2>
  </div>
)

export default BasicExample