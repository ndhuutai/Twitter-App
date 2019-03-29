const filtersDefaultState = {
	text:'',
	tweet_type: 'mixed',
	users: []
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
		case 'ADD_USER':
			return {
				...state,
				users: [...state.users, action.user]
			};
		case 'EDIT_USER':
			state.users.splice(action.id,1,action.user);
			return {
				...state,
				users: [...state.users]
			};
		case 'REMOVE_USER':
			state.users.splice(action.id,1);
			return {
				...state,
				users: [...state.users]
			};
		default:
			return state;
	}
};