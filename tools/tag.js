
const Tag = require('../controllers/mongo/models/tag.js');
const { log, warn, info, err} = require('./console.js');

const { trusted_tags } = require('../.trusted.json');
const tagCap = 64;

const checkValidTags = async () => {
  if (trusted_tags.length <= tagCap) {
    for (let t = 0; t < trusted_tags.length; t++) {
      const { id, name } = trusted_tags[t];
      const tag = await Tag.findOne({id: id});
      if (!tag) {
	info(`\n  RuuviTag ${id} does not pre-exist`, true);
	const wasTagSetupSuccess = setTag(
	  id,
	  name);
	wasTagSetupSuccess
	  ? log(`\n  RuuviTag ${id} setup successful`, true)
	  : err(`\n  RuuviTag ${id} setup failed`, true);
      } else {
	log(`\n  RuuviTag ${id} pre-exists`,false);
      }
    }
  } else {
    warn(`WARN: `,true);
    warn(`Driver cannot process all whitelisted RuuviTags. Please check the application settings or move some of the ${trusted_tags.length} RuuviTags for another driver.`, false);
  }
};

const checkTag = async (tagID) => {
  const foundTag = await Tag.findOne({id: tagID});
  
  if (!foundTag) {
    return false;
  } else {
    return true;
  }
};

const findTag = async (tagID) => {
  let foundTag = await Tag.findOne({id: tagID});
  if (!foundTag) {
    warn(`\n  RuuviTag ${tagID} does not pre-exist`, true);
    return null;
  }
  info(`\n  Found RuuviTag ${tagID}`, false);
  return foundTag;
};

const setTag = async (tagID, name) => {
  info(`\n  Saving new RuuviTag ${tagID}...`, false);
  const newTag = new Tag({
    name: name ? name : `newtag-${tagID}`,
    id: tagID
  });

  try {
    await newTag.save();
    log(`\n  New RuuviTag ${tagID} successfully saved`, true);
    return true;
  } catch (e) {
    err(`\n  Failed saving new RuuviTag ${tagID}`, true);
    return false;
  }
};

exports.checkWhitelist = checkValidTags;
exports.checkTag = checkTag;
exports.findTag = findTag;
exports.setTag = setTag;

