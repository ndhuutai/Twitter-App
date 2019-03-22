const defaultTweetsState = [];

export default (state = defaultTweetsState, action) => {
	switch (action.type) {
		case 'SET_TWEETS':
			return [
				...state,
				...action.tweets
			];
		case 'RESET_TWEETS':
			return [];
		default:
			return state;
	}
}