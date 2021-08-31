const jwt = require('jsonwebtoken')

const secret = 'secret';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData.id;
    } else {
      console.log('Try again');
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;