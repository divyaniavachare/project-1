const blogModel = require('../models/blogsModels')

const createBlog = async function(req, res) {
    try {
    let author = req.body
    if(!author) {
    res.send("Author is not Present");
    }
    let savedData = await blogModel.create(author);
    res.status(201).send({status:true , msg: savedData})
    }catch(err){
    res.status(400).send({msg: err.message})
    }
    }

    const getBlog=async function(req,res){
        try{
        let data = req.query
        let Blogs=await blogModel.find({isDeleted:false, isPublished: true , ...data})
        if(!Blogs){
        res.status(404).send({status: false, msg: "Not found"})
        }
        res.status(200).send({status: true, msg:Blogs})
        
        }catch (err) {
        res.status(500).send({ msg: err.message })
        }
        }


     //=====================================================================================================\\
     
     const updatedBlogger = async function (req, res) {
      try{
        
        let blogId= req.params.blogId;
        let user= await blogModel.findById(blogId);
        if(!user){
          return res.status(400).send("no user exist")
        }
        let data=req.body
        let updateUser=await blogModel.findByIdAndUpdate(blogId,{$push:{tags:data.tags,subCategory:data.subCategory},title,body:data.body,isPublished:true,isPublishedAt:new Date()},{new:true})
      
      res.status(200).send({status:true,data:updateUser});
      }catch(err){
        res.status(500).send({status:false,msg:err.message});
      }
      







      
      
      
      
      
     
     //======================================  deleteBlogger==============================================\\

     
const deleteBlogs = async function(req, res) {
  try{ 
  let blogId = req.params.blogId
  let savedData = await blogModel.findById(blogId)
  if (!savedData) {
      return res.status(404).send("No such blogId is present");
    }
  let deleted = await blogModel.findByIdAndUpdate(savedData, {$set: {isDeleted: true }},{new: true})
  res.status(200).send({msg: deleted})
  }catch(err){
      res.status(500).send({status: false,  msg: err.message})
       }
}
     

       


    module.exports.createBlog = createBlog  
    module.exports.getBlog=getBlog
    module.exports.updatedBlogger=updatedBlogger
    module.exports.deleteBlogs=deleteBlogs
    