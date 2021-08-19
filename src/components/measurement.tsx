
import React from 'react';

import { Temperature, Humidity, Pressure, Voltage, RSSI } from './dial';

type MeasurementTypes = {
  timestamp: number,
  driver: string,
  rssi: number,
  temperature: number,
  humidity: number,
  pressure: number,
  battery: number,
  tag: string,
  withGauges: boolean,
  tagMode: string,
  tagName: string
};

const Measurement = (props: MeasurementTypes) => {
  const { withGauges, tagMode, tagName, tag, timestamp, driver, temperature, humidity, pressure, rssi, battery } = props;

  return <details>
    <summary>{tagName}</summary>
    <p>Measured: {new Date(timestamp).toLocaleString()}</p>
    <p>Driver: {driver}</p>
    {withGauges
      ? <Temperature mode={tagMode} value={temperature} id={`measurement-test`} withLabel={true} />
      : <p>Temperature: {temperature} °C</p>}
    <p>Relative humidity: {humidity} %</p>
    <p>Atmospheric pressure: {pressure/100} hPa</p>
    <p>RSSI: {rssi}</p>
    <p>Tag battery: {battery} V</p>
  </details>;
};

export default Measurement;
