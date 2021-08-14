
import React from 'react';
import axios from 'axios';

import { Temperature, Humidity, Pressure, Voltage, RSSI } from './dial';

class RuuviTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      id: props.id,
      type: props.tagType,
      mode: props.tagMode ?? null,
      measurement: null
    };
  }

  async getReadings() {
    const driverPort = process.env.REACT_APP_DRIVER_PORT || 4001;
    const localIP = process.env.REACT_APP_DRIVER_IP || 'localhost';
    const url = `http://${localIP}:${driverPort}/data/${this.state.id}`;

    try {
      await axios.get(`${url}`).then((response) => {
      	const {data} = response;
      	if (data) {
          this.setState({
            measurement: data
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  
  componentDidMount() {
    this.getReadings();
  }

  getTemperature() {
    return this.state.measurement.temperature;
  }
  getHumidity() {
    return this.state.measurement.humidity;
  }
  getPressure() {
    return this.state.measurement.pressure;
  }
  getVoltage() {
    return this.state.measurement.battery;
  }
  getRSSI() {
    return this.state.measurement.rssi;
  }

  render() {
    return <section>
      <h3>{this.state.name}</h3>
      {this.state.measurement && <Temperature
	mode='indoor'
	value={this.getTemperature()} />}
      {this.state.measurement && <p>Relative humidity: {this.getHumidity()} %</p>}
      {this.state.measurement && <p>Atmospheric pressure: {this.getPressure()/100} hPa</p>}
      {this.state.measurement && <p>Battery: {this.getVoltage()/1000} V</p>}
      {this.state.measurement && <p>RSSI: {this.getRSSI()}</p>}
    </section>;
  }
}

export default RuuviTag;
