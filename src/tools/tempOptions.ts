
export const colors_t = {
  veryLow: 'rgb(3,252,220)',
  low: 'rgb(3,252,102)',
  medium: 'rgb(148,252,3)',
  high: 'rgb(252,190,3)',
  veryHigh: 'rgb(252,48,3)'
};

const winter = {
  min: -50,
  max: 20,
  warn_h: 0,
  warn_l: -15,
  alarm_h: 5,
  alarm_l: -25,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const freezer = {
  min: -40,
  max: 20,
  warn_h: -10,
  warn_l: -25,
  alarm_h: -5,
  alarm_l: -35,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const fridge = {
  min: -5,
  max: 20,
  warn_h: 10,
  warn_l: 6,
  alarm_h: 14,
  alarm_l: 3,
  valueDialClass: 'value-cold',
  valueClass: 'value-text-cold'
};

const summer = {
  min: -10,
  max: 50,
  warn_h: 20,
  warn_l: 10,
  alarm_h: 27,
  alarm_l: 5,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};

const sauna = {
  min: 5,
  max: 130,
  warn_h: 90,
  warn_l: 40,
  alarm_h: 100,
  alarm_l: 20,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};

const indoor = {
  min: 5,
  max: 40,
  warn_h: 25,
  warn_l: 18,
  alarm_h: 28,
  alarm_l: 15,
  valueDialClass: 'value-warm',
  valueClass: 'value-text-warm'
};

const deFault = {
  min: -50,
  max: 50,
  valueDialClass: 'value',
  valueClass: 'value-text'
};

export const getTempSettings = (mode: string) => {
  switch (mode) {
    case 'outdoor-winter': return winter;
    case 'freezer': return freezer;
    case 'fridge': return fridge;
    case 'outdoor-summer': return summer;
    case 'sauna': return sauna;
    case 'indoor': return indoor;
    default: return deFault;
  }
};
