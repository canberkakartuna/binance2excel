const express = require('express')
const request = require('request');
const cors = require('cors')

app = express();
const PORT = 3000;

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/home', function(req, res) {
    request('http://127.0.0.1:5000/flask', function (error, response, body) {
        res.send(body); //Display the response on the website
    });      
});

app.post('/home', function (req, res) {
    request.post('http://127.0.0.1:5000/flask', {form:{key:'value'}}, (err, httpResponse, body) => {
        console.log(body)
    })
  })

app.listen(PORT, function (){ 
    console.log('Listening on Port 3000');
});  