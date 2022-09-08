const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

//----------------------------------------------------------------------------------//
// This is the first api to create an author in database with email validation.

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//===========================================1-Create Author Api====================================================//

const createAuthor = async function (req, res) {

 try {

      let data = req.body

      if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Provides the Author Details" })
      if (!isValid(data.fname)) return res.status(400).send({ status: false, msg: "FirstName is Required" })
      if (!isValid(data.lname)) return res.status(400).send({ status: false, msg: "LastName is Required" })
      if (!data.fname.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "Invalid firstName" })
      if (!data.lname.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "Invalid lastName" })
      if (!isValid(data.title)) return res.status(400).send({ status: false, msg: "Title is Required" })
      if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) return res.status(400).send({status: false,data: "Enter a valid title Mr or Mrs or Miss ",});
      if (!isValid(data.email)) return res.status(400).send({ status: false, msg: "EmailId is Required" }) 
      if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email)) return res.status(400).send({ status: false, msg: "Email-Id is invalid" })
      if (!isValid(data.password)) return res.status(400).send({ status: false, msg: "password is Required" })
      let emailCheck = await authorModel.findOne({ email: data.email })
      if (emailCheck) return res.status(400).send({ status: false, msg: "Email-Id already Registerd" })
      let saveData = await authorModel.create(data)
      res.status(201).send({ status: true, msg:"Author Created Sucessfully",data:saveData })
     }
  catch (err) {
     res.status(500).send({ error: err.message })

  }

}
//----------------------------------------------------------------------------------//
// This is the login api of phase 2 for the authentication.


const loginAuthor=async function(req,res){
  try{
  let reqBody=req.body
  let user=req.body.email
  let password=req.body.password
  if(!isValidRequestBody(reqBody)) return res.status(400).send({status:false,msg:"enter some data in body"})
  if(!isValid(user)) return res.status(400).send({status:false,msg:"email is required"})
  if(!isValid(password)) return res.status(400).send({status:false,msg:"password is required"})
   
  if(!isValidEmail(user)) return res.status(400).send({status:false,msg:"Provide Valid Email-Id"})
  let author = await authorModel.findOne({ user, password });
  if(!author) return res.status(400).send({status:false,msg:"User Password Not Correct"})  
  
  let token=jwt.sign({
      authorId:author._id.toString(),
      Group:"55",
  },
  "tokensecretKey"
  );

  res.header("x-api-key",token)
  res.status(200).send({status:true,msg:"token created successfully",token})
}   catch (error) {
  res.status(500).send({ status: false, message: error.message })
}
}

//---------------------------------------------------------------------------------//

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
