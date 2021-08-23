
// imports

const Tag = require('../controllers/mongo/models/tag.js');
const { log, warn, info, err} = require('./console.js');

const { trusted_tags } = require('../.trusted.json');
const tagCap = 64;

const checkValidTags = async () => {
  info('\n  CHECK: Checking RuuviTag whitelist...',false);
  if (trusted_tags.length <= tagCap) {
    for (trusted_tag of trusted_tags) {
      const { id, name } = trusted_tag;
      const tag = await Tag.findOne({id: id});
      if (!tag) {
	info(`\n  CHECK: RuuviTag ${id} does not pre-exist`, true);
	const wasTagSetupSuccess = setTag(
	  id,
	  name);
	wasTagSetupSuccess
	  ? log(`\n  CHECK: New whitelisted RuuviTag ${id} setup successful`, true)
	  : err(`\n  CHECK: New whitelisted RuuviTag ${id} setup failed`, true);
      } else {
	log(`\n  CHECK: Whitelisted RuuviTag ${id} pre-exists`,false);
      }
    }
    log('\n  CHECK: Whitelist check-up done',false);
    return true;
  } else {
    warn(`\n  WARN: `,true);
    warn(`  Driver cannot process all whitelisted RuuviTags. Please check the application settings or move some of the ${trusted_tags.length} RuuviTags for another driver.`, false);
    return false;
  }
};

const isTagWhitelisted = async (tagID) => {
  const tag = await Tag.findOne({id: tagID});
  return tag ? tag.id === tagID ? true : false : false;
};

const getTagIndex = (tagID) => {
  return trusted_tags.findIndex(tag => tag.id === tagID) ?? -1;
};

const findTag = async (tagID) => {
  let foundTag = await Tag.findOne({id: tagID});
  if (!foundTag) {
    warn(`\n  FIND: RuuviTag ${tagID} does not pre-exist`, true);
    return null;
  }
  info(`\n  FIND: Found RuuviTag ${tagID}`, false);
  return foundTag;
};

const setTag = async (tagID, name) => {
  info(`\n  SET: Saving new RuuviTag ${tagID}...`, false);
  const newTag = new Tag({
    name: name ? name : `newtag-${tagID}`,
    id: tagID
  });

  try {
    await newTag.save();
    log(`\n  SET: New RuuviTag ${tagID} successfully saved`, true);
    return true;
  } catch (e) {
    err(`\n  ERR: Failed saving new RuuviTag ${tagID}`, true);
    return false;
  }
};

exports.checkWhitelist = checkValidTags;
exports.isTagWhitelisted = isTagWhitelisted;
exports.getTagIndex = getTagIndex;
exports.findTag = findTag;
exports.setTag = setTag;

