const mongoose = require('mongoose')
const announcementSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type:String,
      required: true
    },
  });
  
  const announcementModel = mongoose.model('Announcements', idSchema);

  module.exports = announcementModel