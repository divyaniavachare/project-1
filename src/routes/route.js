const express = require('express');
const router = express.Router();
const authControl = require("../controllers/authorControllers")
const blogControl = require("../controllers/blogsController")
const { authenticate, authorise } = require("../middleware/auth")


router.post("/authors", authControl.createAuthor)

router.post("/blogs", blogControl.createBlog)

router.get("/blog", authenticate, authorise, blogControl.getBlog)

// router.put("/update/:blogId", blogControl.updateBlog)
router.put("/update/:blogId", authenticate, authorise, blogControl.updateBlog)

router.delete("/deleteBlog/:blogId", authenticate, authorise, blogControl.deleteBlog)

router.delete("/deleteBlogByQuery", authenticate, authorise, blogControl.deleteBlogByQuery)
router.post("/login", authControl.loginUser)

module.exports = router;