
/*
 * project:     screwdriver
 * author:      RedFoxFinn
 * file:        tag.js
 * purpose:     mongodb/mongoosejs model
 *
 */

const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Tag', TagSchema);

