const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");

//----------------------------------------------------------------------------------//
// This is the first api to create an author in database with email validation.

const createAuthor = async function (req, res) {
  try {
      let data = req.body;
      if(!isValidRequestBody(data)){
          return res.status(400).send({status:false,msg:"invalid"})
        }
          if (!data)return res.status(400).send({status:false,msg:"enter data"})
      
      let { fname, lname, title, email, password } = data
      if (!fname) { return res.status(400).send({ status: false, msg: "fname is required" }) }
      if (!lname) { return res.status(400).send({ status: false, msg: "lname is required" }) }
      if (!title) { return res.status(400).send({ status: false, msg: "title is required" }) }
      if (!email) { return res.status(400).send({ status: false, msg: "email is required" }) }
      if (!password) { return res.status(400).send({ status: false, msg: "password is required" }) }

      if (typeof fname !== "string" || fname[0] == " " || fname[fname.length - 1] == " ") {
          return res.status(400).send({ status: false, msg: "please enter valid fname" })
      }

      if (typeof lname !== "string" || lname[0] == " " || lname[lname.length - 1] == " ") {
          return res.status(400).send({ status: false, msg: "please enter valid lname" })
      }

      if (title !== "Mr" && title !== "Mrs" && title !== "Miss") {
          return res.status(400).send({ status: false, msg: "please enter valid title" })
      }

      let findEmail = await authorModel.findOne({ email: email })
      if (findEmail) {
          return res.status(400).send({ status: false, msg: "email already exist" })
      }
      fname.trim()
      let savedData = await authorModel.create(data)
      res.status(201).send({ msg: savedData })
  } catch (err) {
      res.status(500).send({ msg: err.message })
  }
}

//----------------------------------------------------------------------------------//
// This is the login api of phase 2 for the authentication.

const doLogin = async function (req, res) {
  try {
    userEmail = req.body.email;
    userPassword = req.body.password;
    let user = await authorModel.findOne({
      email: userEmail,
      password: userPassword,
      isDeleted: false,
    });

    if (user) {
      let fname = user.fname;
      let lname = user.lname;
      let payload = { userId: user._id, email: user.email };
      const generatedToken = jwt.sign(payload, "FunctionUp Plutonium");
      res.status(200).send({
        Message: fname + " " + lname + " you have logged in Succesfully",
        YourId: user._id,
        token: generatedToken,
      });
    } else {
      res.status(400).send({ status: false, message: "Oops...Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//---------------------------------------------------------------------------------//

module.exports.createAuthor = createAuthor;
module.exports.doLogin = doLogin;
