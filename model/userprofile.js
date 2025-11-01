const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: []
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default:[]
    },
  ],
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
