const jwt = require("jsonwebtoken");




//*********************************************AUTHENTICATION************************************************************************

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "functionUp-plutonium-project-key")
     
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }
          req.decodedToken = decodedToken


            next()
        } catch (err) {
            res.status(500).send({ status: false, msg: err.message })
        }
    }


//*********************************************AUTHORIZATION************************************************************************

const authorization = function (req, res, next) {
        try {
           
             let loggedInAuthorId =  req.decodedToken.authorId                            
            let requestAuthorId = req.query.authorId
            if (requestAuthorId != loggedInAuthorId) {
                return res.status(403).send({ status: false, message: "Unauthorized" })
            }
            next()
        } catch (err) {
            res.status(500).send({ status: false, msg: err.message })
        }
    }




    module.exports.authorization = authorization
    module.exports.authentication = authentication