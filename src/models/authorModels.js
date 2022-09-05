const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema( {

fname:
{      
     type : string, 
       required:true 
} ,   
lname: { 
    type:string,
    required:true
}, 
title: 
       {type :string,
       enum:[Mr, Mrs, Miss],
       required:true    
    },
 email: 
 
 {
    type:string, 
    required:true,
    unique :true
}, 
password: {
    type: string,
    required :true
} 
}, { timestamps: true });


module.exports = mongoose.model('Author', AuthorSchema)