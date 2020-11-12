const express = require("express")
const bodyParser = require("body-parser")
const fetch = require('node-fetch')
const EventEmitter = require('events')
const app = express()
const PORT = 1000

const myEmitter = new EventEmitter();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)) 

app.post("/hook", (req, res) => {
    myEmitter.emit('notification', req.body.status);
    res.status(200).send({
        msg: 'client url --> successfull got it',
    });
});

// client app update data
app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    myEmitter.on('notification', (status) => {
        console.log("New Status has received:", status);
        res.write("data: " + status +'\n\n');
    });
});