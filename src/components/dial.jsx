import React, { useRef, useEffect } from 'react';
import SvgGauge from 'svg-gauge';

import { getTempSettings, colors_t } from '../tools/tempOptions';
import { getHumidSettings, colors_h } from '../tools/humidOptions';
import { getPresSettings, colors_p } from '../tools/presOptions';

import '../styles/gauge.css';

const WithBar = ({value}) => {
  return value;
};

const defaultGaugeOptions = { 
  temperature: {
    animationDuration: 2,
    label: function (value) {
      return `${value.toFixed(1)} °C`;},
    initialValue: 0
  },
  humidity: {
    animationDuration: 2,
    label: function (value) {
      return `${value.toFixed(1)} %`;},
    initialValue: 0
  },
  pressure: {
    animationDuration: 2,
    label: function (value) {
      return `${(value/100).toFixed(1)} hPa`;},
    initialValue: 101300
  },
  battery: {
    animationDuration: 2,
    label: function (value) {
      return `${(value/1000).toFixed(2)} V`;},
    initialValue: 2400
  }
};

const modes = [
  'outdoor-winter','freezer','fridge',
  'outdoor-summer', 'sauna', 'indoor'
];

const presGaugeOptions = (mode) => {
  const presOpt = getPresSettings(mode);

  if (modes.includes(mode)) {
    return {
      min: presOpt.min,
      max: presOpt.max,
      valueDialClass: presOpt.valueDialClass,
      valueClass: presOpt.valueClass,
      color: function(value) {
        if (value < presOpt.alarm_l) {
          return colors_p.veryLow;
        } else if (value < presOpt.warn_l) {
          return colors_p.low;
        } else if (value < presOpt.warn_h) {
          return colors_p.medium;
        } else if (value < presOpt.alarm_h) {
          return colors_p.high;
        } else { 
          return colors_p.veryHigh;
        }
      }
    };
  } else {
    return {
      min: 50000,
      max: 115534,
      valueDialClass: 'value',
      valueClass: 'value-text'
    };
  }
};

const humidGaugeOptions = (mode) => {
  const humidOpt = getHumidSettings(mode);

  if (modes.includes(mode)) {
    return {
      min: humidOpt.min,
      max: humidOpt.max,
      valueDialClass: humidOpt.valueDialClass,
      valueClass: humidOpt.valueClass,
      color: function(value) {
        if (value < humidOpt.alarm_l) {
          return colors_h.veryLow;
        } else if (value < humidOpt.warn_l) {
          return colors_h.low;
        } else if (value < humidOpt.warn_h) {
          return colors_h.medium;
        } else if (value < humidOpt.alarm_h) {
          return colors_h.high;
        } else {
          return colors_h.veryHigh;
        }
      }
    };
  } else {
    return {
      min: -50,
      max: 50,
      valueDialClass: 'value',
      valueClass: 'value-text'
    };
  }
};

const tempGaugeOptions = (mode) => {
  const tempOpt = getTempSettings(mode);
  
  function getRangeClass(value) {
    if (value < tempOpt.alarm_l) {
      return 'veryLow';
    } else if (value < tempOpt.warn_l) {
      return 'low';
    } else if (value < tempOpt.warn_h) {
      return 'medium';
    } else if (value < tempOpt.alarm_h) {
      return 'high';
    } else {
      return 'veryHigh';
    }
  }

  if (modes.includes(mode)) {
    return {
      min: tempOpt.min,
      max: tempOpt.max,
      valueDialClass: tempOpt.valueDialClass,
      valueClass: tempOpt.valueClass,
      color: function(value) {
        if (value < tempOpt.alarm_l) {
          return colors_t.veryLow;
        } else if (value < tempOpt.warn_l) {
          return colors_t.low;
        } else if (value < tempOpt.warn_h) {
          return colors_t.medium;
        } else if (value < tempOpt.alarm_h) {
          return colors_t.high;
        } else {
          return colors_t.veryHigh;
        }
      }
    };
  } else {
    return {
      min: -50,
      max: 50,
      valueDialClass: 'value',
      valueClass: 'value-text'
    };
  }
};

const ranges = {
  rssi: {
    low: [-120,-71],
    nominal: [-70,20]
  },
  voltage: {
    minMax: [1600,3646],
    cutoff: 2000,
    low: {
      cold: [2000,2249],
      warm: [2000,2449]
    },
    nominal: {
      cold: [2250,3399],
      warm: [2450,3399]
    },
    high: 3400
  }
};

const Gauge = ({type, mode, value, name}) => {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef(null);
  useEffect(() => {
    let options;
    if (!gaugeRef.current) {
      switch (type) {
        case 'temperature': {
          options = {...defaultGaugeOptions.temperature, ...tempGaugeOptions(mode)};
          break;
        }
        case 'humidity': options = {...defaultGaugeOptions.humidity, ...humidGaugeOptions(mode)}; break;
        case 'pressure': options = {...defaultGaugeOptions.pressure, ...presGaugeOptions(mode)}; break;
        case 'voltage': options = {...defaultGaugeOptions}; break;
        case 'rssi': options = {...defaultGaugeOptions}; break;
        default: options = {...defaultGaugeOptions}; break;
      }

      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(value, 1);
    } else {
      gaugeRef.current.setValue(value, 1);
    }
  }, [value, type, mode]);

  return <section ref={gaugeEl} className='gauge-container'/>;
};

const Label = ({type, mode}) => {
  switch (type) {
    case 'temperature': {};
    case 'humidity': {};
    case 'pressure': {};
    case 'voltage': {};
    case 'rssi': {};
    default: return null;
  }
};

export const Temperature = (props) => {
  return <section id={props.id} data-testid={props.id} >
    <Gauge type='temperature' mode={props.mode} value={props.value} />
    {props.name && <p>{props.name}</p>}
  </section>
};

export const Humidity = (props) => {
  return <section id={props.id} data-testid={props.id} >
    <Gauge type='humidity' mode={props.mode} value={props.value} />
    {props.name && <p>{props.name}</p>}
  </section>
};

export const Pressure = (props) => {
  return <section id={props.id} data-testid={props.id} >
    <Gauge type='pressure' mode={props.mode} value={props.value} />
    {props.name && <p>{props.name}</p>}
  </section>
};

export const RSSI = () => {};

export const Voltage = () => {};
