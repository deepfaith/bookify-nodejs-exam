const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const busboy = require("connect-busboy");
const bodyParser = require("body-parser");
const busboyBodyParser = require("busboy-body-parser");
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    if (req.method === "OPTIONS")
        res.sendStatus(200);
    else
        next();
});

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}));

app.use(helmet.noCache());

app.use(busboy());

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(busboyBodyParser());


module.exports = app;