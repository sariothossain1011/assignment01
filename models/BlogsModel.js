const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    updatedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const BlogsModel = new mongoose.model("blogs", BlogsSchema);

module.exports = BlogsModel;
