const express = require('express');
const router = express.Router();
const axios = require('axios');
const getAuthenticationToken = require('../middleware/application');

router.get('/searchTweets', getAuthenticationToken, async (req,res) => {
	try {
		const { data } = await axios.get('https://api.twitter.com/1.1/search/tweets.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				Authorization: `Bearer ${req.token}`
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

router.get('/searchUser', getAuthenticationToken, async (req, res) => {
	try {
		const { data } = await axios.get('https://api.twitter.com/1.1/users/lookup.json', {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				Authorization: `Bearer ${req.token}`
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

module.exports = router;