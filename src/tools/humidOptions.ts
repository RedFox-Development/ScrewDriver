
export const colors_h = {
  veryLow: 'rgb(3,252,220)',
  low: 'rgb(3,252,102)',
  medium: 'rgb(148,252,3)',
  high: 'rgb(252,190,3)',
  veryHigh: 'rgb(252,48,3)'
};

const cold = {
  min: 0.000,
  max: 163.835,
  warn_h: 40.000,
  warn_l: 20.000,
  alarm_h: 60.000,
  alarm_l: 10.000,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const warm = {
  min: 0.000,
  max: 163.835,
  warn_h: 70.000,
  warn_l: 50.000,
  alarm_h: 90.000,
  alarm_l: 30.000,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};
const deFault = {
  min: 50,
  max: 50,
  valueDialClass: 'value',
  valueClass: 'value-text'
};

export const getHumidSettings = (mode: string) => {
  switch (mode) {
    case 'cold': return cold;
    case 'warm': return warm;
    default: return deFault;
  }
};
