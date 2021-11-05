
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const generateTagDataUrl = (tagID) => {
  const ip = process.env.REACT_APP_DRIVER_IP ?? null;
  const port = process.env.REACT_APP_DRIVER_PORT ?? null;
  return tagID && ip && port
    ? `http://${process.env.REACT_APP_DRIVER_IP}:${process.env.REACT_APP_DRIVER_PORT}/data/${tagID}`
    : null;
};

const RuuviTag = (props) => {
  const [measurement, setMeasurement] = useState(null);
  const url = generateTagDataUrl(props.id);

  async function getReadings() {
    await axios.get(`${url}`)
      .then((response) => {
        const {data} = response;
        console.log(response);
        if (data) {
          setMeasurement(data);
        }
      })
      .catch((err) => console.error(err));    
  }
  useEffect(() => getReadings(), []);
  setTimeout(() => getReadings(), 15000);
  
  return measurement
    ? <Measurement {...measurement} driver={props.driver} tagName={props.name} withGauges={true} tagMode={props.tagMode} />
    : <h3>{props.name}</h3>;

};

export default RuuviTag;
