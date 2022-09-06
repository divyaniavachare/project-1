const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorControllers");
const blogsControllers=require("../controllers/blogsController")
// const blogsModels = require('../models/blogsModels');
// const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createBlog",blogsControllers.createBlog)
router.get("/blog", blogsControllers.getBlog)
router.put("/update/:blogId",blogsControllers.updatedBlogger)
router.delete ("/blogs/:blogId",blogsControllers.deleteBlog)




// const express = require('express');
// const router = express.Router();
// const authorControllers= require("../controllers/authorControllers")
// // const commonMV=require("../middleware/auth")





// router.post('/Authors',authorControllers.Author)

module.exports = router;