
const { checkTag } = require('./tag.js');
const Measurement = require('../controllers/mongo/models/measurement.js');
const { err, info, log, warn } = require('./console.js');

const checkMeasurement = async (timestamp) => {};

const findMeasurement = async (timestamp) => {};

const setMeasurement = async (measurement, tagID, datetime) => {
  info(`\n  Checking RuuviTag ${tagID}...`);
  checkTag(tagID);
  log('  Done');
  info(`  Saving new Measurement...`);
  let newMeasurement = new Measurement({
    timestamp: datetime,
    driver: process.env.DRIVER_ID.toString(),
    rssi: measurement.rssi,
    temperature: measurement.temperature,
    humidity: measurement.humidity,
    pressure: measurement.pressure,
    battery: measurement.battery,
    tag: tagID
  });
  try {
    newMeasurement = await newMeasurement.save();
    log(`\n  Measurement ${measurement.measurementSequenceNumber} successfully saved\n`, false);
    warn(newMeasurement, false);
  } catch (e) {
    err(`\n  Failed saving measurement ${measurement.measurementSequenceNumber}`, true);
  }
};

exports.checkMeasurement = checkMeasurement,
exports.findMeasurement = findMeasurement;
exports.setMeasurement = setMeasurement;

