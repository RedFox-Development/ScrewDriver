

export const colors_v = {
  veryLow: 'rgb(3,252,220)',
  low: 'rgb(3,252,102)',
  medium: 'rgb(148,252,3)',
  high: 'rgb(252,190,3)',
  veryHigh: 'rgb(252,48,3)'
};

function isCold(mode: string) {
  const coldModes = ['outdoor-winter', 'freezer', 'fridge'];
  return coldModes.includes(mode);
}

const cold = {
  min: 1600,
  max: 3300,
  warn_h: 3100,
  warn_l: 2200,
  alarm_h: 3200,
  alarm_l: 1900,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const warm = {
  min: 1800,
  max: 3400,
  warn_h: 3100,
  warn_l: 2300,
  alarm_h: 3300,
  alarm_l: 2000,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};
const deFault = {
  min: 50,
  max: 50,
  valueDialClass: 'value',
  valueClass: 'value-text'
};

export const getVoltSettings = (mode: string) => {
  return isCold(mode) ? cold : warm;
};
