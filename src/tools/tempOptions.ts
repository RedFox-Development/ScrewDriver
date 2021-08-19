
const colors = {
  coldVeryLow: 'rgb(11,0,171)',
  coldLow: 'rgb(2,119,196)',
  coldMedium: 'rgb(2,208,227)',
  coldHigh: 'rgb(2,227,175)',
  coldVeryHigh: 'rgb(2,227,137)',
  warmVeryLow: 'rgb(2,232,182)',
  warmLow: 'rgb(2,232,117)',
  warmMedium: 'rgb(117,232,2)',
  warmHigh: 'rgb(232,201,2)',
  warmVeryHigh: 'rgb(232,106,2)'
};

const winter = {
  min: -50,
  max: 20,
  warn: -15,
  alarm: -25,
  ranges: [
    [-50,-25, colors.coldVeryLow],
    [-25,-15, colors.coldLow],
    [-15,-5, colors.coldMedium],
    [-5,5, colors.coldHigh],
    [5,20, colors.coldVeryHigh]]
};

const freezer = {
  min: -30,
  max: 30,
  warn: -15,
  alarm: -5,
  ranges: [
    [-30,-20, colors.coldVeryLow],
    [-20,-15, colors.coldLow],
    [-15,-5, colors.coldMedium],
    [-5,30, colors.coldHigh]]
};

const fridge = {
  min: -5,
  max: 30,
  warnLow: 3,
  alarmLow: 0,
  warnHigh: 8,
  alarmHigh: 10,
  ranges: [
    [-5,3, colors.coldVeryLow],
    [3,6, colors.coldLow],
    [6,10, colors.coldMedium],
    [10,14, colors.coldHigh],
    [14,30, colors.coldVeryHigh]]
};

const summer = {
  min: -10,
  max: 50,
  warnLow: 10,
  alarmLow: 5,
  warnHigh: 25,
  alarmHigh: 30,
  ranges: [
    [-10,10, colors.warmVeryLow],
    [10,20, colors.warmLow],
    [20,25, colors.warmMedium],
    [25,30, colors.warmHigh],
    [30,50, colors.warmVeryHigh]]

};

const sauna = {
  min: 5,
  max: 130,
  warn: 90,
  alarm: 100,
  ranges: [
    [5,40, colors.warmVeryLow],
    [40,60, colors.warmLow],
    [60,80, colors.warmMedium],
    [80,90, colors.warmHigh],
    [90,130, colors.warmVeryHigh]]

};

const indoor = {
  min: 5,
  max: 50,
  warnLow: 20,
  alarmLow: 15,
  warnHigh: 28,
  alarmHigh: 35,
  ranges: [
    [5,15, colors.warmVeryLow],
    [15,20, colors.warmLow],
    [20,28, colors.warmMedium],
    [28,35, colors.warmHigh],
    [35,50, colors.warmVeryHigh]]
};

const defaultTemp = {
  min: -50,
  max: 50
};

export const getTempSettings = (mode: string) => {
  switch (mode) {
    case 'outdoor-winter': return winter;
    case 'freezer': return freezer;
    case 'fridge': return fridge;
    case 'outdoor-summer': return summer;
    case 'sauna': return sauna;
    case 'indoor': return indoor;
    default: return defaultTemp;
  }
};
