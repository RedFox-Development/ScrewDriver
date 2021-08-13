
// imports

// libraries
require('dotenv').config();
const ruuvi = require('node-ruuvitag');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

// project tools
const { log, warn, info, err} = require('./tools/console.js');
const { checkWhitelist, checkTag, findTag, setTag } = require('./tools/tag.js');
const { setMeasurement } = require('./tools/measurement.js');

// other project files
const Tag = require('./controllers/mongo/models/tag.js');
const Measurement = require('./controllers/mongo/models/measurement.js');

// mongoose settings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

// definitions
const oneMinute = 60*1000;
const fiveMinutes = 5*oneMinute;

// init

try {
  mongoose.connect(process.env.MONGO);
  log('\n  MongoDB Atlas: connected', true);
} catch (e) {
  warn('\n  MongoDB Atlas: connection failed', true);
}

const createDriver = () => {
  const driver = express();
  driver.use(bodyParser.json());
  driver.use(bodyParser.urlencoded({ extended: false }));
  driver.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  driver.route('/')
    .get((req, res) => {
      res.json({"measurement": {"temperature":0}});
    })
    .post((req,res) => {
      res.json({"measurement": {"temperature":0}});
    });

  return driver;
};

const startScrewingAround = () => {
  checkWhitelist();
  ruuvi.on('found', tag => {
    let lastUpdate = null;
    const tagChecked = checkTag(tag.id);
    info(
      `\n  Found a ${tagChecked
        ? 'new'
        : 'pre-existing'} RuuviTag, ID: ${tag.id}`, false);
    tag.on('updated', data => {
      const timestamp = new Date().valueOf();
      if (timestamp - lastUpdate > fiveMinutes && tagChecked) {
        lastUpdate = timestamp;
        setMeasurement(data, tag.id, timestamp);
      } else {
        info(`\n  ${tagChecked ? 'Trusted ' : 'Unknown '}RuuviTag ${tag.id}, measurement ${data.measurementSequenceNumber} ignored.`, false);
      }
      // log(JSON.stringify(data, null, '  '), false);
    });
  });

  ruuvi.on('warning', message => {
    err('\n  Ruuvi warning', true);
  });
  return true;
};

const stopScrewingAround = () => {
  if (ruuvi) {
    ruuvi.stop();
    ruuvi = null;
  }
};

module.exports.createDriver = createDriver;
module.exports.start = startScrewingAround;
module.exports.stop = stopScrewingAround;

if (module.parent === null) {
  const driver = createDriver();
  const port = process.env.DRIVER_PORT || 4001;
  startScrewingAround();
  driver.listen(port, () => {
    info(`\n  ScrewDriver running on port ${port}`, true);
  });
}
