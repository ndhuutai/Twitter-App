import axios from 'axios';

export const setTweets = (tweets) => ({
	type: 'SET_TWEETS',
	tweets
});

export const resetTweets = () => ({
	type: 'RESET_TWEETS'
});

export const startSetTweets = (filters) => {
	return async (dispatch) => {
		if(filters) {
			// axios.get('/searchTweets',{
			// 	params: {
			// 		q: filters.text,
			// 		result_type: filters.tweet_type
			// 	}
			// }).then(response => response.data.statuses)
			// 	.then((tweets) => {
			// 		dispatch(setTweets(tweets));
			// 	}).catch(err => console.log(err));
			try {
				const { data } = await axios.get('/searchTweets',{
					params: {
						q: filters.text,
						result_type: filters.tweet_type
					}
				});
				dispatch(setTweets(data.statuses))
			} catch (e) {
				console.log(e);
			}
		} else {
			dispatch(setTweets([]));
		}
	}
};