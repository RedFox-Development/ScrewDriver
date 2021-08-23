
const { isTagWhitelisted } = require('./tag.js');
const Measurement = require('../controllers/mongo/models/measurement.js');
const { err, info, log, warn } = require('./console.js');

const checkMeasurement = async (timestamp) => {};

const findMeasurement = async (timestamp) => {};

const setMeasurement = async (measurement, tagID, datetime) => {
  if (isTagWhitelisted(tagID)) {
    info(`\n  MEASUREMENT: Saving...`);
    let newMeasurement = new Measurement({
      timestamp: datetime,
      driver: process.env.DRIVER_ID.toString(),
      rssi: measurement.rssi,
      temperature: measurement.temperature,
      humidity: measurement.humidity,
      pressure: measurement.pressure,
      battery: measurement.battery,
      measurementSequenceNumber: measurement.measurementSequenceNumber,
      tag: tagID
    });
    try {
      newMeasurement = await newMeasurement.save(); 
      log(`  MEASUREMENT: saved #${newMeasurement.measurementSequenceNumber}`, false);
      warn(newMeasurement, false);
      return newMeasurement;
    } catch (e) {
      err(`  MEASUREMENT: failed saving #${measurement.measurementSequenceNumber}`, true);
      return null;
    }
  } else {
    warn(`\n  WARN: RuuviTag ${tagID} is not whitelisted\n  Ignoring measurement #${measurement.measurementSequenceNumber} from it, not saved.`, true);
    return null;
  }
};

exports.checkMeasurement = checkMeasurement,
exports.findMeasurement = findMeasurement;
exports.setMeasurement = setMeasurement;

