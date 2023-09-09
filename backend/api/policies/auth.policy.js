const JWTService = require("../services/auth.service");
const { log } = require("winston");

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = (req, res, next) => {
  let tokenToVerify;

  let email = req.body.customer_email;
  var promise = [];
  if(email != null) {
    try {
      Promise.all(promise)
        .then((result) => {
          let r = JSON.stringify(result);
          console.log("response", result[0].dataValues.value);
          console.log("response email", email);
          if (result[0].dataValues.value == 1) {
            if (
              email != "john.doe@gmail.com"
            ) {
              console.log("im here 1");
              return res
                .status(405)
                .json({ msg: "Only test users can login in maintenance mode" });
            } else {
              console.log("im here 2");
              if (req.header("Authorization")) {
                const parts = req.header("Authorization").split(" ");

                if (parts.length === 2) {
                  const scheme = parts[0];
                  const credentials = parts[1];

                  if (/^Bearer$/.test(scheme)) {
                    tokenToVerify = credentials;
                  } else {
                    return res
                      .status(401)
                      .json({ msg: "Format for Authorization: Bearer [token]" });
                  }
                } else {
                  return res
                    .status(401)
                    .json({ msg: "Format for Authorization: Bearer [token]" });
                }
              } else if (req.body.token) {
                tokenToVerify = req.body.token;
                delete req.query.token;
              } else {
                return res
                  .status(401)
                  .json({ msg: "No Authorization was found" });
              }

              return JWTService().verify(tokenToVerify, (err, thisToken) => {
                if (err) return res.status(401).json({ err });
                req.token = thisToken;
                return next();
              });
            }
          } else {
            console.log("im here 3");
            if (req.header("Authorization")) {
              const parts = req.header("Authorization").split(" ");

              if (parts.length === 2) {
                const scheme = parts[0];
                const credentials = parts[1];

                if (/^Bearer$/.test(scheme)) {
                  tokenToVerify = credentials;
                } else {
                  return res
                    .status(401)
                    .json({ msg: "Format for Authorization: Bearer [token]" });
                }
              } else {
                return res
                  .status(401)
                  .json({ msg: "Format for Authorization: Bearer [token]" });
              }
            } else if (req.body.token) {
              tokenToVerify = req.body.token;
              delete req.query.token;
            } else {
              return res.status(401).json({ msg: "No Authorization was found" });
            }

            return JWTService().verify(tokenToVerify, (err, thisToken) => {
              if (err) return res.status(401).json({ err });
              req.token = thisToken;
              return next();
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (err) {
      // better save it to log file
      console.error(err);
    }
  }else{

    console.log("im here 4");
    if (req.header("Authorization")) {
      const parts = req.header("Authorization").split(" ");

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/.test(scheme)) {
          tokenToVerify = credentials;
        } else {
          return res
            .status(401)
            .json({ msg: "Format for Authorization: Bearer [token]" });
        }
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else if (req.body.token) {
      tokenToVerify = req.body.token;
      delete req.query.token;
    } else {
      return res.status(401).json({ msg: "No Authorization was found" });
    }

    return JWTService().verify(tokenToVerify, (err, thisToken) => {
      if (err) return res.status(401).json({ err });
      req.token = thisToken;
      return next();
    });
  }

};
