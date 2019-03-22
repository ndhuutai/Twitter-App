const express = require('express');
const app = express () ;
const axios = require('axios');
const bodyParser = require('body-parser');
const Base64 = require('js-base64').Base64;
const keys = require('./config/keys');

let token = '';

axios.post('https://api.twitter.com/oauth2/token',
	'grant_type=client_credentials'
	,
	{
		headers: {
			Authorization: `Basic ${Base64.encode(`${keys.API_key}:${keys.API_secret_key}`)}`
		}
	}
).then((response) => {
	token = response.data['access_token']
});

//help parse request body
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());


app.get('/', (req,res) => {
});

//routes
app.get('/home', (req, res) => {
	res.send('Hello from Express');
});

app.get('/searchTweets', (req,res) => {
	axios.get('https://api.twitter.com/1.1/search/tweets.json', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			Authorization: `Bearer ${token}`
		},
		params: {
			...req.query
		}
	}).then(response => res.send(response.data))
		.catch(err => res.send(err.response.data));
});

app.listen(3000, () => {
	console.log('server is running on port 3000 ');
});
