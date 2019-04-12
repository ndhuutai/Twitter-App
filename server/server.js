const express = require('express');
const app = express () ;
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const path = require('path');
const publicPath = path.join(__dirname, '..','public');
const applicationRouter = require('./routes/application');

const port = process.env.PORT || 3000;


//help parse request body
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(publicPath));
//routes handlers for application-only requests
app.use(applicationRouter);


app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath,'index.html'));
});

app.listen(port, () => {
	console.log('Server is up and running!');
});
