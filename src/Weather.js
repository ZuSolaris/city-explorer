import React from 'react';


class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.weatherData.map((data) => (
          <>
            <p>Weather Data</p>
            <p>Weather Date</p>
            <div>{data.date}</div>
            <p>Weather Details</p>
            <div>{data.desc}</div>
          </>
        ))}
      </>
    )
  }

}
export default Weather;


