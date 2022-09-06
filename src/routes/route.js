const express = require('express');
const router = express.Router();
const authControl= require("../controllers/authorControllers")
const blogControl=require("../controllers/blogsController")


router.post("/authors", authControl.createAuthor)

router.post("/blogs", blogControl.createBlog)

router.get("/blog", blogControl.getBlog)

// router.put("/update/:blogId", blogControl.updateBlog)
router.put("/update/:blogId",blogControl.updateBlog)

router.delete("/deleteBlog/:blogId",blogControl.deleteBlog)

router.delete("/deleteBlogByQuery",blogControl.deleteBlogByQuery)


module.exports = router;
