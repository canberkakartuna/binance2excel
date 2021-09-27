const express = require('express')
const axios = require('axios');
const cors = require('cors')
const fileUpload = require('express-fileupload');

app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

app.get('/home', function(req, res) {
    res.send('123')
});

app.post('/home', function (req, res) {
    axios.post('http://localhost:5000/flask', {
        myFile: req.files.myFile
    }).then(function (response) {
        console.log(response.data)
        res.send(response.data)
    }).catch(function (error) {
        console.log(error)
    })
})

app.listen(PORT, function (){ 
    console.log('Listening on Port 3000');
});  