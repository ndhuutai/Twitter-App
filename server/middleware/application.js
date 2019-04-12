const axios = require('axios');
const Base64 = require('js-base64').Base64;
const keys = require('../config/keys');

const getApplicationToken = async (req, res, next) => {
	try {
		const { data } = await axios.post('https://api.twitter.com/oauth2/token',
			'grant_type=client_credentials'
			,
			{
				headers: {
					Authorization: `Basic ${Base64.encode(`${keys.API_key}:${keys.API_secret_key}`)}`
				}
			}
		);

		req.token = data['access_token'];


		next();
	} catch (e) {
		res.status(500).send('something is wrong here');
	}
};

module.exports = getApplicationToken;