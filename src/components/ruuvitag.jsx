
import React from 'react';
import axios from 'axios';

import { Temperature, Humidity, Pressure, Voltage, RSSI } from './dial';
import Measurement from './measurement';

const sampleMeasurement = {
  timestamp: 1628881647805,
  driver: 'test-driver',
  rssi: -20,
  temperature: 28.47,
  humidity: 57.0234,
  pressure: 99303,
  battery: 3003,
  tag: 'tagID'
};

class RuuviTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      id: props.id,
      mode: props.tagMode ?? 'default',
      gauges: props.useGauges ?? false,
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

  getMinuteInMS() {
    return 1000*60;
  }

  render() {
    setTimeout(() => this.getReadings(), this.getMinuteInMS());
    return this.state.measurement
      ? <Measurement {...sampleMeasurement} tagName={this.state.name} withGauges={true} tagMode={this.state.mode} />
      : <h3>{this.state.name}</h3>;
  }
}

export default RuuviTag;
