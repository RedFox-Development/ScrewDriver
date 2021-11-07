
// imports

// libraries
require('dotenv').config();
const ruuvi = require('node-ruuvitag');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

// project tools
const { log, warn, info, err} = require('./tools/console.js');
const { checkWhitelist, isTagWhitelisted, getTagIndex, findTag, setTag } = require('./tools/tag.js');
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
const { trusted_tags } = require('./.trusted.json');

const oneMinute = 60*1000;
const measurementCaptureInterval = process.env.NODE_ENV === 'production'
  ? Math.floor(0.25*oneMinute)
  : Math.floor(0.1*oneMinute);

let measurements = [];

// init

const initMongoose = () => {
  try {
    mongoose.connect(process.env.MONGO);
    log('\n  SETUP: MongoDB Atlas: connected', true);
  } catch (e) {
    warn('\n  SETUP: MongoDB Atlas: connection failed', true);
  }
};

const createDriver = () => {
  const driver = express();
  driver.use(bodyParser.json());
  driver.use(bodyParser.urlencoded({ extended: false }));
  driver.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  driver.set('json spaces', 2);
  driver.route('/')
    .get((req, res) => {
      res.json({"measurement": measurements[0]});
    });
  driver.route('/data/:id')
    .get(async (req, res) => {
      const tagIndex = trusted_tags.findIndex(tag => tag.id === req.params.id);
      const data = measurements[tagIndex];
      res.json(data);
    });

  return driver;
};

const startScrewingAround = () => {
  if (checkWhitelist()) {
    info(`\n  SETUP: Measurement capture interval set to ${measurementCaptureInterval/1000}s.`,false);
    ruuvi.on('found', tag => {
      let lastUpdate = null;
      let tagIndex = null;
      if (isTagWhitelisted(tag.id)) {
	info(`\n  TAG: Found a pre-existing RuuviTag, ID: ${tag.id}.`,false);
	tag.on('updated', data => {
	  const timestamp = new Date().valueOf();
	  tagIndex = getTagIndex(tag.id);
	  if (timestamp - lastUpdate >= measurementCaptureInterval && tagIndex > -1) {
	    lastUpdate = timestamp;
	    setMeasurement(data, tag.id, timestamp);
	    measurements[tagIndex] = {...data, id: tag.id, timestamp: timestamp};
            // log(JSON.stringify(data, null, '  '),false);
          } else {
            info(`\n  IGNORE: Trusted RuuviTag ${tag.id}, measurement ${data.measurementSequenceNumber} ignored.`, false);
          }
	});
      } else {
        info(`\n  IGNORE: Found a new RuuviTag, ID: ${tag.id}\n  Ignoring measurements from RuuviTag ${tag.id}.`, false);
      }
    });
    // log(JSON.stringify(tag, null, '  '),false);
        
    ruuvi.on('warning', message => {
      warn('\n  WARN: Ruuvi warning', true);
    });
  } else {
    err(`\n  ERR: ScrewDriver err: whitelist chickup failure`,true);
  }
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
  initMongoose();
  driver.listen(port, () => {
    info(`\n  START: ScrewDriver running on port ${port}.\n  ScrewDriver running in ${process.env.NODE_ENV} mode.`, true);
    startScrewingAround();
  });
}
