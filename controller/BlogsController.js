const BlogsModel = require("../models/BlogsModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    switch (true) {
      case !title.trim():
        return res
          .status(400)
          .json({ status: "fail", message: "Title is required" });
      case !content.trim():
        return res
          .status(400)
          .json({ status: "fail", message: "Content is required" });
    }

    const data = await new BlogsModel({
      email: req.user,
      title,
      content,
    }).save();

    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.readBlog = async (req, res) => {
  try {
    const data = await BlogsModel.findById(req.params.id);
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.readBlogs = async (req, res) => {
  try {
    const data = await BlogsModel.find();
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const data = await BlogsModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        updatedDate: Date.now(),
      },
      { new: true }
    );
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await BlogsModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: "success", message: "Blog delete successfully" });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
