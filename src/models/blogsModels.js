//  const { ObjectID } = require('bson');
const { ObjectID } = require('bson');
const mongoose = require('mongoose');
// const { boolean } = require('webidl-conversions');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema( {


title: {
    type: string,
    required:true
},


body: 
{   
    type : string,
    required:true
   }, 

authorId: {
            type:ObjectId,
            ref:"Author"
},
    

tags: {
    type:[String]
},

 category:{
    type : [String]
 },
   

subcategory: {
        type:[string]
},

 isDeleted:{
    type:boolean,
    default:false
 } ,
 
   isPublished: {
    type: boolean,
    default:false
}
}, { timestamps: true });



module.exports = mongoose.model('blogsSchema', blogsSchema)
