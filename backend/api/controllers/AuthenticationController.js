const jwt = require('jsonwebtoken');
const authenticationService = require('../services/authentication.service');


const AuthenticationController = () => {

  const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
          const response = await authenticationService().signIn(email,password);
          return res.status(200).json({
              "data": {
                "user": response.user,
                "token": response.user.accessToken,
              },
              "message": "Logged in successfully",
          });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
  }


  const forgotPassword = async (req, res) => {
    const email = req.body.email
    try {
      return res.status(200).json({
        "result_code"   : 0
        , "server_date" : ""
        , "message"     : "Email Sent successfully"
      });
    }
    catch (err) {
      return res.status(500).json({
        "result_code"   : 1
        , "server_date" : ""
        , "err.message" : err
      });
    }
  }

  const register = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const response = await authenticationService().register(email,password);
        console.log(response);
        return res.status(200).json({
          "message": "Registered successfully",
        });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
  }

  const test = async (req,res) => {
    const {body} = req;
    try {
      return res.status(200).json({
        "message": "Logged in successfully",
        "access_token":jwt,
        "is_newly_registered" : true,
        "is_loyalty" : false,
        "is_reset_password" : false
      });

    } catch (error) {
      return res.status(200).json({
        "message": "Logged in successfully",
        "access_token":jwt,
        "is_newly_registered" : true,
        "is_loyalty" : false,
        "is_reset_password" : false
      });
    }
  }
  return {
    test,
    login,
    forgotPassword,
    register
  }

}
module.exports = AuthenticationController;
