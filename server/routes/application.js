const express = require('express');

const router = express.Router();

router.get('/searchTweets', async (req,res) => {
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

module.exports = {
	router
};