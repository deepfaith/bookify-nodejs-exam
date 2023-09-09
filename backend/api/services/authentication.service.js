const firebase = require('../../config/firebase');

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

const auth = firebase.auth;

const authenticationService = () => {

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        return userCredential;
      })
      .catch(function (err) {
        throw new Error(err.message);
      })
  }

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch(function (err) {
        throw new Error(err.message);
      })
  }

  return {
    register,
    signIn
  };
};

module.exports = authenticationService;
