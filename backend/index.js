const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const app = express();  


app.use(express.static('uploadedPicture'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/upload', require('./route/Upload'))

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
 });
 