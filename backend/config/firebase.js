const jwt = require('jsonwebtoken');
const firebase = require("firebase/app");
const firebase_auth = require("firebase/auth");
const firebase_firestore = require("firebase/firestore");

const firebaseParam = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
  appId: process.env.FB_APPID
};

const app = firebase.initializeApp(firebaseParam);
const db = firebase_firestore.getFirestore(app);
const auth = firebase_auth.getAuth(app);

const firebaseConfig = {
  app: app,
  db: db,
  auth: auth,
};

module.exports = firebaseConfig;
