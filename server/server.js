const express = require('express');
const app = express () ;
const axios = require('axios');
const bodyParser = require('body-parser');
const Base64 = require('js-base64').Base64;
const keys = require('./config/keys');
const path = require('path');
const publicPath = path.join(__dirname, '..','public');
const port = process.env.PORT || 3000;


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

app.use(express.static(publicPath));


app.get('/searchTweets', async (req,res) => {
	try {
		const { data } = await axios.get('https://api.twitter.com/1.1/search/tweets.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: {
				...req.query
			}
		});

		res.send(data);
	} catch (e) {
		res.send(e.response.data);
	}
});

app.get('/searchUser', async (req, res) => {
	try {
		const { data }= await axios.get('https://api.twitter.com/1.1/users/lookup.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
			params: {
				...req.query
			}
		});

		res.send(data);
	} catch (e) {
		res.send(e.response.data);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath,'index.html'));
});

app.listen(port, () => {
	console.log('Server is up and running!');
});
