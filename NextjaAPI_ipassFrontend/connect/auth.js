import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authheader =
    req.body.token || req.query.token || req.headers["authorization"];
  const token = authheader && authheader.split(' ')[1];
  console.log("toen",token)
 
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
 
let parsToken=token.substring(7,token.length);
  try {
    
    const decoded = jwt.decode(parsToken);
    console.log("decoded",decoded)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = verifyToken;            


