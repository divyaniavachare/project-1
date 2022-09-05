const authorModels = require('../models/authorModels');





const createAuthor = async function(req, res) {
  try {
  let data = req.body;
  let savedData = await authorModel.create(data)
  res.status(201).send( {msg: savedData})
  }catch(err){
  res.status(500).send({msg: err.message})
  }
  }
  


  




module.exports.createAuthor = createAuthor
  // module.exports.createAuthor=createAuthor