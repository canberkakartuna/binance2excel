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

app.post('/file', (req, res) => {
    const file = req.files.file;
    const filename = file.name;

    axios({
        method: "post",
        url: "http://localhost:5000/flask",
        data: file,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        res.send(response.data)
    }).catch(function (response) {
        //handle error
        console.log(response);
    });
})

app.listen(PORT, function (){ 
    console.log('Listening on Port 3000');
});  