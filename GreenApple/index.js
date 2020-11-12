const express = require("express")
const bodyParser = require("body-parser")
const fetch = require('node-fetch')
const app = express()
const PORT = 3000

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

const processSomething = callback => {
    setTimeout(callback, 5000);
}

app.post("/updateStatus", (req, res) => {
    console.log("Status", req.body.data);
    fetch("http://localhost:1000/hook", { // client hook url
            method: 'POST',
            body: JSON.stringify({
                "status": req.body.data
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(json => {
            console.log(json);
            res.status(200).send({
                status: req.body.data,
                msg: 'successful'
            });
        });
});