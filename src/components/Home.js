import React, { Component } from 'react'
import axios from 'axios'

const BASE_API_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=052f26926ae9784c2d677ca7bc5dec98'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      temp: '...',
      city: 'Seattle',
      icon: '10d',
      description: '...'
    }
  }

  componentDidMount(){
    this.getWeather()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.getWeather()
  }

  getWeather = () => {
    axios.get(`${BASE_API_URL}&q=${this.state.city}`)
    .then(res => {
      console.log(res.data)
      let fahrenheit = (res.data.main.temp - 273.15) * (9/5) + 32
      this.setState({
        temp: fahrenheit.toFixed(1),
        icon: res.data.weather[0].icon,
        description: `Looks like some ${res.data.weather[0].description} out there!`
      })
    })
    .catch(e => {
      this.setState({ temp: 'Something went wrong with getting the weather... :('})
    })
  }

  render(){
    return(
        <div>
          <h2>Hello, {this.props.name} from {this.state.city}!</h2>
          <h3>Your current weather is: {this.state.temp}°F</h3>
          <div>
            <img alt="wicon" src={"http://openweathermap.org/img/w/" + this.state.icon + ".png"} />
            {this.state.description}
          </div>
          <hr />
          <h3>Not from {this.state.city}? Tell us where you're from!</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.city}
              onChange={ (e) => this.setState({ city: e.target.value }) }
            />
            <input type="submit" value="Fetch Weather" />
          </form>
        </div>
      )
  }
}

export default Home
