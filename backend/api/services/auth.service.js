const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : '11ISDT_z5LjAarX1JoabOO9W';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, "11ISDT_z5LjAarX1JoabOO9W", { expiresIn: '1d' });
  const refreshToken = (payload) => jwt.sign(payload, "11ISDT_z5LjAarX1JoabOO9W", { expiresIn: '2d' });
  const verify = (token, cb) => jwt.verify(token, "11ISDT_z5LjAarX1JoabOO9W", {}, cb);
  const token = (payload) => jwt.sign(payload, "11ISDT_z5LjAarX1JoabOO9W", { expiresIn: '1h' });

  return {
    issue,
    verify,
    refreshToken,
    token
  };
};

module.exports = authService;
