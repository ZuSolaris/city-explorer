import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      city: '',
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

      let cityData = await axios.get(url);

      this.setState({
        cityData: cityData.data[0],
        error: false,
        img: cityData.data[0]
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
      console.log('test');
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
            <Form.Control type='text' placeholder='Type a city here!' onInput={this.cityRename}/>
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
          
          <p id = 'title'>{this.state.cityData.display_name}</p>
          <p id = 'lat'>{this.state.cityData.lat}</p>
          <p id = 'lon'>{this.state.cityData.lon}</p>
          <img id= "map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYLOC_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400&maptype='streets'&markers=icon:small-red-cutout|${this.state.cityData.lat}${this.state.cityData.lon}`} alt= "map"/>
          <p className= 'copyrite'>ZuSolaris</p>
          </div>
          

        }
      </>
    );
  }
}

export default App;