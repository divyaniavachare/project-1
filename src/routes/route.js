const express = require('express');
const router = express.Router();

const authorControllers = require('../controllers/authorControllers')
const blogControllers = require('../controllers/blogControllers') 
const appMiddleware = require('../middleWares/appMiddleware')


//Project 1 - Phase - 1
router.post('/Authors',authorControllers.createAuthor);
router.post('/createBlog',appMiddleware.getAuthorDetails,appMiddleware.authorization,blogControllers.createBlog)
router.get('/getBlog',appMiddleware.getAuthorDetails,appMiddleware.authorization, blogControllers.returnBlogsFiltered) //
router.put('/getUpdate/:id',appMiddleware.getAuthorDetails ,appMiddleware.authorization, blogControllers.updateData);
router.delete('/deleteUpdate/:id',appMiddleware.getAuthorDetails,appMiddleware.authorization, blogControllers.deleteBlog);
router.delete('/deleteUpdate2',appMiddleware.getAuthorDetails,appMiddleware.authorization, blogControllers.deleteSpecific);

//Project 1 - Phase - 2
// router.post('/Login',authorControllers.loginAuthor)
router.post('/Login',authorControllers.loginAuthor)


module.exports = router;