
const Tag = require('../controllers/mongo/models/tag.js');
const { log, warn, info, err} = require('./console.js');

const checkTag = async (tagID) => {
  const foundTag = await Tag.findOne({id: tagID});
  
  if (!foundTag) {
    warn(`\n  RuuviTag ${tagID} does not pre-exist`, true);
    const wasTagSetupSuccess = setTag(tagID);
    wasTagSetupSuccess
      ? log(`\n  RuuviTag ${tagID} setup successful`, true)
      : err(`\n  RuuviTag ${tagID} setup failed`, true);
    return {initial: false, addedNew: wasTagSetupSuccess};
  } else {
    log(`\n  RuuviTag ${tagID} pre-exists`, false);
    return {initial: true, addedNew: false};
  }
};

const findTag = async (tagID) => {
  let foundTag = await Tag.findOne({id: tagID});
  if (!foundTag) {
    warn(`\n  RuuviTag ${tagID} does not pre-exist`, true);
    const wasTagSetupSuccess = setTag(tagID);
    foundTag = await Tag.findOne({id: tagID});
  }
  info(`\n  Found RuuviTag ${tagID}`, false);
  return foundTag;
};

const setTag = async (tagID) => {
  info(`\n  Saving new RuuviTag ${tagID}...`, false);
  const newTag = new Tag({
    name: `newtag-${tagID}`,
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

exports.checkTag = checkTag;
exports.findTag = findTag;
exports.setTag = setTag;

