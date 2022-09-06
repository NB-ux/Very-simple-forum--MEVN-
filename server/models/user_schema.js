const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username field is required'],
      unique: [true],
    },
    email: {
      type: String,
      required: [true, 'email field is required'],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, 'password field is required'],
    },
    image: {
      type: String,
      required: [true, 'image field is required']
    }

  },
  { timestamps: true },
);

module.exports = model('users', userSchema);
