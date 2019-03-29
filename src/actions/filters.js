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
	return (dispatch) => {
		return axios.get('/searchUser', {
			params: {
				screen_name: user
			}
		}).then(response => {
			if(response.data.hasOwnProperty('errors')) {
				throw new Error(response.data.errors[0].message);
			}
			return response.data;
		})
			.then(data => {
				dispatch(addUserFilter(data[0].screen_name));
			})
			.catch(err => err);
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