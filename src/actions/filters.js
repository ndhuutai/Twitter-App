import axios from 'axios';

export const setTextFilter = (text) => ({
	type: 'SET_TEXT',
	text
});

export const setTypeFilter = (tweet_type) => ({
	type: 'SET_TYPE',
	tweet_type
});

export const addUserFilter = (user) => ({
	type: 'ADD_USER',
	user
});

export const startAddUserFilter = (user) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/searchUser', {
				params: {
					screen_name: user
				}
			});

			//check if response has errors
			if(data.hasOwnProperty('errors')) {
				throw new Error(data.errors[0].message);
			}

			dispatch(addUserFilter(data[0].screen_name));
		} catch (e) {
			return e;
		}
	}
};

export const editUserFilter = (id , user) => ({
	type: 'EDIT_USER',
	id,
	user
});

export const removeUserFilter = (id) => ({
	type: 'REMOVE_USER',
	id
});