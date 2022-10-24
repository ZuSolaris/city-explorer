import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      city: '',
      error: false,
      errorMsg: ''
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
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.Message
      })
      console.log('test');
    }




  }

  render() {
    return (
      <>
        <Form onSubmit={this.getCity}>
          <Form.Group className='search'>
            <Form.Label>City Look Up</Form.Label>
            <Form.Control type='text' placeholder='Type a city here!' onInput={this.cityRename}/>
            <Form.Text className='undertext'>
              Search from anywhere in the world!
            </Form.Text>
          </Form.Group>
          <Button variant='info' type='submit'>
            Submit
          </Button>
        </Form>
        {
          this.state.error
            ?
            <p>{this.state.errorMessage}</p>
            :
            <div>
          <p>{this.state.cityData.display_name}</p>
          <p>{this.state.cityData.lat}</p>
          <p>{this.state.cityData.lon}</p>
          </div>
          

        }
      </>
    );
  }
}

export default App;