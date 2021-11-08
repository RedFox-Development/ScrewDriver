
export const colors = {
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
  min: -120,
  max: 0,
  warn_h: -80,
  warn_l: -55,
  alarm_h: -95,
  alarm_l: -25,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const warm = {
  min: -120,
  max: 0,
  warn_h: -80,
  warn_l: -55,
  alarm_h: -95,
  alarm_l: -25,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};
const deFault = {
  min: 50,
  max: 50,
  valueDialClass: 'value',
  valueClass: 'value-text'
};

export const getRSSISettings = (mode: string) => {
  return {
    min: -120,
    max: 0,
    warn_h: -80,
    warn_l: -55,
    alarm_h: -95,
    alarm_l: -25,
    valueDialClass: 'value',
    valueClass: 'value-text'
  };
};
