
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

function isToday(datetimeMS: number) {
  const dt = new Date(datetimeMS);
  const today = new Date();
  const y = dt.getFullYear() === today.getFullYear();
  const m = dt.getMonth() === today.getMonth();
  const d = dt.getDate() === today.getDate();
  return y && m && d ? true : false;
}

function sanitiseSeconds(seconds: number) {
  const m = Math.floor(seconds/60);
  const s = seconds-(m*60);
  return m >= 60 ? `~ ${Math.floor(m/60)}h ${m%60}min` : m < 1 ? s >= 30 ? `~ ${m+1}min` : `< ${m+1}min` : `~ ${s >= 30 ? m+1 : m}min`;
}

function sanitiseDatetime(datetimeMS: number) {
  const dt = new Date(datetimeMS);
  const today = new Date();
  const diff = (today.valueOf()-dt.valueOf())/1000;
  const month = dt.getMonth()+1 < 10
    ? `0${dt.getMonth()}`
    : dt.getMonth();
  const day = dt.getDate() < 10
    ? `0${dt.getDate()}`
    : dt.getDate();
  const time = `${dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours()}:${dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes()}`;
  
  return isToday(datetimeMS)
    ? `${sanitiseSeconds(diff)} ago`
    : `${day}.${month}.${dt.getFullYear()} - ${time}`;
}

const Measurement = (props: MeasurementTypes) => {
  const { withGauges, tagMode, tagName, tag, timestamp, driver, temperature, humidity, pressure, rssi, battery } = props;

  return <section style={{
    border: '4px outset #808080',
    borderRadius: '6px',
    width: '20rem',
    margin: '1rem',
    padding: '1rem'
  }}>
    <h3>{tagName}</h3>
    <p>Measured: {sanitiseDatetime(timestamp)}</p>
    <p>Driver: {driver}</p>
    {withGauges
      ? <Temperature mode={tagMode} value={temperature} id={`measurement-test`} withLabel={true} />
      : <p>Temperature: {temperature} °C</p>}
    <p>Relative humidity: {humidity} %</p>
    <p>Atmospheric pressure: {pressure/100} hPa</p>
    <p>RSSI: {rssi}</p>
    <p>Tag battery: {battery} V</p>
  </section>;
};

export default Measurement;
