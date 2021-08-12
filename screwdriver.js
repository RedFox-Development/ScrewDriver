
// imports

// libraries
require('dotenv').config();
const ruuvi = require('node-ruuvitag');
const mongoose = require('mongoose');

// project tools
const { log, warn, info, err} = require('./tools/console.js');
const { checkTag, findTag, setTag } = require('./tools/tag.js');
const { setMeasurement } = require('./tools/measurement.js');

// other project files
const Tag = require('./controllers/mongo/models/tag.js');
const Measurement = require('./controllers/mongo/models/measurement.js');

// definitions
const oneMinute = 60*1000;
const fiveMinutes = 5*oneMinute;

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

try {
  mongoose.connect(process.env.MONGO);
  log('\n  MongoDB Atlas: connected', true);
} catch (e) {
  warn('\n  MongoDB Atlas: connection failed', true);
}

ruuvi.on('found', tag => {
  let lastUpdate = null;
  const tagChecked = checkTag(tag.id);
 
  info(
    `\n  Found a ${tagChecked.initial
      ? tagChecked.addedNew
        ? 'new'
        : 'pre-existing'
      : 'pre-existing'} RuuviTag, ID: ${tag.id}`, false);
  tag.on('updated', data => {
    const timestamp = new Date().valueOf();
    if (timestamp - lastUpdate > oneMinute) {
      lastUpdate = timestamp;
      setMeasurement(data, tag.id, timestamp);
    } else {
      info(`\n  RuuviTag ${tag.id}, measurement ${data.measurementSequenceNumber} ignored.`, false);
    }
    // log(JSON.stringify(data, null, '  '), false);
  });
});

ruuvi.on('warning', message => {
  err('\n  Ruuvi warning', true);
});
