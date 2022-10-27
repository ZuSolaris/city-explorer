import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Movie from './Movie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import { findAllByTestId } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      weatherError: false,
      wErrorMsg: '',
      cityData: [],
      city: '',
      movieData: [],
      error: false,
      errorMsg: '',
      img: ''
    }
  }

  cityRename = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }


  getCity = async (e) => {
    e.preventDefault();
    console.log(this.state.city);
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITYLOC_API_KEY}&q=${this.state.city}&format=json`

      this.getWeather(this.state.city);

      let cityData = await axios.get(url);

      this.setState({
        cityData: cityData.data[0],
        error: false,
        img: cityData.data[0],

      }, this.callAPI)
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
    }

  }
callAPI = async () => {
  await this.getWeather()
  await this.getMovie()
}
  getWeather = async (location) => {


    try {
      let weatherurl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`

      // let weatherurl = `http://localhost:3001/weather?cityName=${this.state.city}&?lat=${this.state.city.lat}&lon=${this.state.city.lon}`
      let weatherData = await axios.get(weatherurl);
      console.log(weatherData.data);

      this.setState({
        weatherData: weatherData.data,
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        ErrorMsg: error.message
      })
      console.log('test');

    }

  }

  getMovie = async (location) => {



    try {
      let movieurl = `${process.env.REACT_APP_SERVER}/Movie?query=${this.state.city}`

      let movieData = await axios.get(movieurl);

      this.setState({
        movieData: movieData.data,
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        ErrorMsg: error.message
      })
    }
  }






  render() {
    return (
      <>
        <h1>Find Your City!</h1>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Form onSubmit={this.getCity}>
              <Form.Group className='search'>
                <Form.Label>City Look Up: </Form.Label>
                <Form.Control type='text' placeholder='Type a city here!' onInput={this.cityRename} />
                <Form.Text className='undertext'>
                  Search from anywhere in the world!
                </Form.Text>
              </Form.Group>
              <Button id="blue" type='submit'>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {
          this.state.error
            ?
            <p>{this.state.errorMsg}</p>
            :
            <div>

              <p id='title'>{this.state.cityData.display_name}</p>
              <Weather weatherData={this.state.weatherData} getWeather={this.getWeather} />
              <Movie movieData={this.state.movieData}/>
              <p>Coordinates</p>
              <p id='lat'>{this.state.cityData.lat}</p>
              <p id='lon'>{this.state.cityData.lon}</p>
              <img id="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYLOC_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400&maptype='streets'&markers=icon:small-red-cutout|${this.state.cityData.lat}${this.state.cityData.lon}`} alt="map" />
              <p className='copyrite'>ZuSolaris</p>
            </div>


        }
      </>
    );
  }
}

export default App;