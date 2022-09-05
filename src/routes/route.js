const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorControllers")
// const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )










// const express = require('express');
// const router = express.Router();
// const authorControllers= require("../controllers/authorControllers")
// // const commonMV=require("../middleware/auth")





// router.post('/Authors',authorControllers.Author)

module.exports = router;