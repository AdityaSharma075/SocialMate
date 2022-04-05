const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Friendships = require('./friendships');
const AVATAR_PATH = path.join('/uploads/user/avatar');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    avatar: {
      type: String,
    },
    friends:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref : Friendships ,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  'avatar'
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;
