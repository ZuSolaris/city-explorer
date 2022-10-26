import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      weatherError: false,
      wErrorMsg: '',
    }
  }

getWeather = async (e) => {
  e.preventDefault();

  try {
    let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.cityData.display_name}&?lat=${this.state.city.lat}&lon=${this.state.city.lon}`

    let weatherData = await axios.get(url);

    this.setState({
      weatherError: false,
    });
  } catch (error) {
    this.setState({
      weatherError: true,
      wErrorMsg: error.message
    })
    console.log('test');
  }

}
}
export default Weather;