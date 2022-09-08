const express = require('express');
const router = express.Router();

const authorControllers = require('../controllers/authorControllers')
const blogControllers = require('../controllers/blogControllers') 
const appMiddleware = require('../middleWares/appMiddleware')


//Project 1 - Phase - 1
// router.post('/Authors',authorController.createAuthor);
router.post('/Authors',appMiddleware.authorization,getAuthorDetails,authorControllers.createAuthor);
// router.post('/createBlog',appMiddleware.getAuthorDetails,blogController.createBlog);
router.post('/createBlog',appMiddleware.authorization,getAuthorDetails,blogControllers.createBlog)
router.get('/getBlog',appMiddleware.getAuthorDetails,authorization, blogControllers.returnBlogsFiltered) //
router.put('/getUpdate/:id',appMiddleware.getAuthorDet,ailsauthorization, blogControllers.updateData);
router.delete('/deleteUpdate/:id',appMiddleware.getAuthorDetails,authorization, blogControllers.deleteBlog);
router.delete('/deleteUpdate2',appMiddleware.getAuthorDetails,authorization, blogControllers.deleteSpecific);

//Project 1 - Phase - 2
router.post('/doLogin',appMiddleware.authorization,getAuthorDetails,authorControllers.doLogin)


module.exports = router;