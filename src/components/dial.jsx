import React, { useRef, useEffect } from 'react';
import SvgGauge from 'svg-gauge';

import { getTempSettings, colors_t } from '../tools/tempOptions';
import { getHumidOptionsm, colors_h } from '../tools/humidOptions';

import '../styles/gauge.css';

const WithBar = ({value}) => {
  return value;
};

const defaultGaugeOptions = {
  animationDuration: 2,
  label: function (value) {return value.toFixed(1);},
  initialValue: 0
};

const modes = [
  'outdoor-winter','freezer','fridge',
  'outdoor-summer', 'sauna', 'indoor'
];

const humidGaugeOptions = (mode) => {
  const humidOpt = null;

  if (modes.includes(mode)) {
    return {
      min: humidOpt.min,
      max: humidOpt.max,
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
  humidity: {
    minMax: [0.000,163.835],
    miscalibrationAlert: 120.000,
    verylow: {
      cold: [0.000,9.999],
      warm: [0.000,29.999]
    },
    low: {
      cold: [10.000,19.999],
      warm: [30.000,49.999]
    },
    normal: {
      cold: [20.000,39.999],
      warm: [50.000,69.999]
    },
    high: {
      cold: [40.000,89.999],
      warm: [70.000,89.999]
    },
    veryhigh: [90.000,119.999]
  },
  pressure: {
    hPaDrop: [0,5],
    hPaDropNotice: 1,
    hPaDropAlert: 3,
    Pa_hPa: 100,
    minMax: [50000,115534],
    verylow: [80000,89999],
    low: [90000,99999],
    normal: [100000,102999],
    high: [103000,109999],
    veryhigh: [110000,115534]
  },
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
          options = {...defaultGaugeOptions, ...tempGaugeOptions(mode)};
          break;
        }
        case 'humidity': options = {...defaultGaugeOptions}; break;
        case 'pressure': options = {...defaultGaugeOptions}; break;
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
    <Gauge type='temperature' mode={props.mode} value={props.value} label={`${props.value.toFixed(2)}`} />
    {props.name && <p>{props.name}</p>}
  </section>
};

export const Humidity = () => {};

export const Pressure = () => {};

export const RSSI = () => {};

export const Voltage = () => {};
