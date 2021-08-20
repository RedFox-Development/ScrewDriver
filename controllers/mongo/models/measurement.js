
/*
 * project:	screwdriver
 * author:	RedFoxFinn
 * file:	measurement.js
 * purpose:	mongodb/mongoosejs model
 *
 */

const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
  },
  driver: {
    type: String,
    required: true
  },
  rssi: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  pressure: {
    type: Number,
    required: true
  },
  battery: {
    type: Number,
    requires: true
  },
  tag: {
    type: String,
    required: true
  },
  measurementSequenceNumber: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
