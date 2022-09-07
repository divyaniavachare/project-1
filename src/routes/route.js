const express = require('express');
const router = express.Router();

const authorControllers = require('../controllers/authorControllers')
const blogControllers = require('../controllers/blogControllers') 
const appMiddleware = require('../middleWares/appMiddleware')


//Project 1 - Phase - 1
// router.post('/Authors',authorController.createAuthor);
router.post('/Authors',authorControllers.createAuthor);
// router.post('/createBlog',appMiddleware.getAuthorDetails,blogController.createBlog);
router.post('/createBlog',appMiddleware.getAuthorDetails,blogControllers.createBlog)
router.get('/getBlog',appMiddleware.getAuthorDetails, blogControllers.returnBlogsFiltered) //
router.put('/getUpdate/:id',appMiddleware.getAuthorDetails, blogControllers.updateData);
router.delete('/deleteUpdate/:id',appMiddleware.getAuthorDetails, blogControllers.deleteBlog);
router.delete('/deleteUpdate2',appMiddleware.getAuthorDetails, blogControllers.deleteSpecific);

//Project 1 - Phase - 2
router.post('/doLogin',authorControllers.doLogin)


module.exports = router;