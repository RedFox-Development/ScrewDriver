
export const pressureVariations = {
  incDecHPAfor8m: [1,-1],
  incDecHPAinHourWarn: [1,-1],
  incDecHPAinHourAlert: [3,-3],
  loHPAtreshold: 1010,
  hiHPAtreshold: 1017
};

export const colors_p = {
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
  min: 90000,
  max: 110000,
  warn_h: 102500,
  warn_l: 99500,
  alarm_h: 105000,
  alarm_l: 95000,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const warm = {
  min: 90000,
  max: 110000,
  warn_h: 102500,
  warn_l: 99500,
  alarm_h: 105000,
  alarm_l: 95000,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};
const deFault = {
  min: 50,
  max: 50,
  valueDialClass: 'value',
  valueClass: 'value-text'
};

export const getPresSettings = (mode: string) => {
  return isCold(mode) ? cold : warm;
};
