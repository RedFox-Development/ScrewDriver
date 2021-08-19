import React, { useRef, useEffect } from 'react';
import SvgGauge from 'svg-gauge';

import { getTempSettings } from '../tools/tempOptions';
import '../styles/gauge.css';

//"rgb(3,252,102)";
//          } else if (value < 25) {
  //          return "rgb(148,252,3)";
    //      } else if (value < 28) {
      //      return "rgb(252,190,3)";
        //  } else {
          //  return "rgb(252,48,3)";


const WithBar = ({value}) => {
  return value;
};

const defaultGaugeOptions = {
  animationDuration: 2,
  showValue: true,
  initialValue: 0
};

/**
 * default
 * outdoor-winter
 * freezer
 * fridge
 * outdoor-summer
 * sauna
 * indoor
 */
const tempGaugeOptions = (mode) => {
  const coldModes = [];
  const warmModes = [];

  const tempOpt = getTempSettings(mode);

  switch (mode) {
    case 'outdoor-winter': return {
      min: -50,
      max: 20,
      valueDialClass: 'value-cold',
      valueClass: 'value-text-cold',
      color: function(value) {
        if (value < -25) {
          return "rgb(3,252,102)";
        } else if (value < -15) {
          return "rgb(148,252,3)";
        } else if (value < -5) {
          return "rgb(252,190,3)";
        } else if (value < 5) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    case 'freezer': return {
      min: -30,
      max: 30,
      valueDialClass: 'value-cold',
      valueClass: 'value-text-cold',
      color: function(value) {
        if (value < -20) {
          return "rgb(3,252,102)";
        } else if (value < -15) {
          return "rgb(148,252,3)";
        } else if (value < -5) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    case 'fridge': return {
      min: -5,
      max: 30,
      valueDialClass: 'value-cold',
      valueClass: 'value-text-cold',
      color: function(value) {
        if (value < 6) {
          return "rgb(3,252,102)";
        } else if (value < 10) {
          return "rgb(148,252,3)";
        } else if (value < 14) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    case 'outdoor-summer': return {
      min: -10,
      max: 50,
      valueDialClass: 'value-warm',
      valueClass: 'value-text-warm',
      color: function(value) {
        if (value < 10) {
          return "rgb(3,252,102)";
        } else if (value < 20) {
          return "rgb(148,252,3)";
        } else if (value < 27) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    case 'sauna': return {
      min: 5,
      max: 130,
      valueDialClass: 'value-warm',
      valueClass: 'value-text-warm',
      color: function(value) {
        if (value < 40) {
          return "rgb(3,252,102)";
        } else if (value < 60) {
          return "rgb(148,252,3)";
        } else if (value < 80) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    case 'indoor': return {
      min: 5,
      max: 50,
      valueDialClass: 'value-warm',
      valueClass: 'value-text-warm',
      color: function(value) {
        if (value < 18) {
          return "rgb(3,252,102)";
        } else if (value < 25) {
          return "rgb(148,252,3)";
        } else if (value < 28) {
          return "rgb(252,190,3)";
        } else {
          return "rgb(252,48,3)";
        }
      }
    };
    default: return {
      min: -50,
      max: 50,
      valueDialClass: 'value',
      valueClass: 'value-text'
    };
  }
};

const ranges = {
  temperature: {
    minMax: [-80.000,160.000],
    freezerAlert: -15.000,
    fridgeAlert: 6.000,
    saunaAlert: 100.000,
    verylow: {
      cold: [-50.000,-25.001],
      warm: [-5.000,4.999],
      sauna: [22.000,39.999]
    },
    low: {
      cold: [-25.000,-15.001],
      warm: [5.000,13.999],
      sauna: [40.000,59.999]
    },
    normal: {
      cold: [-15.000,-2.001],
      warm: [14.000,21.999],
      sauna: [60.000,79.999]
    },
    high: {
      cold: [-2.000,6.999],
      warm: [22.000, 27.999],
      sauna: [80.000,94.999]
    },
    veryhigh: {
      cold: [7.000,17.999],
      warm: [28.000,42.000],
      sauna: [95.000,110.000]
    }
  },
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
    <Gauge type='temperature' mode={props.mode} value={props.value} />
    {props.name && <p>{props.name}</p>}
  </section>
};

export const Humidity = () => {};

export const Pressure = () => {};

export const RSSI = () => {};

export const Voltage = () => {};
