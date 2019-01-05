const jwt = require('jsonwebtoken');

module.exports = {
  create(data) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, process.env.SECRET, { algorithm: 'HS256' }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    })
  },

  verify(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'JWT verification error' });
      } else {
        return next();
      }
    });
  }
}