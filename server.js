const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cors());
//check dev or production environment
if (process.env.NODE_ENV === 'production') app.use(express.static('frontend/build'));

// 🔀  server routes 🔀 
app.use('/', require('./router'));

app.listen(port, () => console.info(`Example app listening at http://localhost:${port}`));