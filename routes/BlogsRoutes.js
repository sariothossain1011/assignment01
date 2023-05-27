const express = require("express");
const Authentication = require("../middleware/Authentication");
const { createBlog,readBlog, updateBlog, deleteBlog, readBlogs } = require("../controller/BlogsController");
const router = express.Router()


router.post("/createBlog",Authentication,createBlog)
router.get("/readBlog/:id",Authentication,readBlog)
router.get("/readBlogs",Authentication,readBlogs)
router.post("/updateBlog/:id",Authentication,updateBlog)
router.get("/deleteBlog/:id",Authentication,deleteBlog)



module.exports = router