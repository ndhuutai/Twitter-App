const filtersDefaultState = {
	text:'',
	tweet_type: 'mixed'
};

export default (state = filtersDefaultState, action) => {
	switch(action.type) {
		case 'SET_TEXT':
			return {
				...state,
				text: action.text
			};
		case 'SET_TYPE':
			return {
				...state,
				tweet_type: action.tweet_type
			};
		default:
			return state;
	}
};