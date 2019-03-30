import React from 'react';
import { connect } from 'react-redux';
import {setTextFilter, startAddUserFilter, editUserFilter, removeUserFilter} from '../actions/filters';
import { startSetTweets, resetTweets } from '../actions/tweets';
import UserInput from './UserInput';
import Tweet from './Tweet';


class TweetShowcase extends React.Component {

	state = {
		error: {
			state: false,
			message: ''
		}
	};

	randomizeUser = () => {
		return Math.floor(Math.random() * this.props.filters.users.length);
	};

	getRandomTweet = () => {
		if(this.props.tweets) {
			const random = Math.floor(Math.random() * this.props.tweets.length);
			return this.props.tweets[random];
		}
		return '';
	};

	onSubmit = (e) => {
		e.preventDefault();
		const index = this.props.filters.users.findIndex(user => user.toLowerCase() === e.target.input.value.toLowerCase());
		if(index >= 0) {
			this.setState({
				error: {
					state: true,
					message: 'Already added'
				}
			});
		} else {
			this.props.startAddUserFilter(e.target.input.value).then(error => {
				console.log(error.toString());
				if(error.toString().includes('Error')) {
					this.setState({
						error: {
							state: true,
							message: error.toString()
						}
					});
				}
			});

			this.setState({
				error: {
					state: false,
					message: ''
				}
			})
		}
	};

	onClick = (e) => {
		this.props.setTextFilter(`from:${this.props.filters.users[this.randomizeUser()]}`);
		if(this.props.tweets.length > 0) {
			this.props.resetTweets();
		}
		this.props.startSetTweets({
			...this.props.filters,
			text: `from:${this.props.filters.users[this.randomizeUser()]}`,
			tweet_type: 'mixed'
		});
	};

	onChange = (id, user) => {
		this.props.editUserFilter(id,user);
	};

	onRemove = (id) => {
		this.props.removeUserFilter(id);
	};

	render() {
		return (
			<div>
				{this.props.filters.users?
					this.props.filters.users.map((user,index) => (
						<UserInput key={index} id={index} user={user} onChange={this.onChange} onRemove={this.onRemove}/>
					)):<p>Currently there is no user/handle selection</p>}
				{this.state.error.state?<div className="alert alert-danger">{this.state.error.message}</div>:''}
				<form onSubmit={this.onSubmit} className="input-group mb-3 w-auto">
					<input type="text" name="input" className="form-control" placeholder="Add user's name or handle"
					        aria-describedby="basic-addon2"/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="button">Add</button>
						</div>
				</form>
				<button className="btn btn-primary" onClick={this.onClick}>RANDOMIZE!</button>
				{this.getRandomTweet()?<Tweet {...this.getRandomTweet()}/>:''}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tweets: state.tweets,
		filters : state.filters
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTextFilter: text => dispatch(setTextFilter(text)),
		resetTweets: () => dispatch(resetTweets()),
		startSetTweets: filters => dispatch(startSetTweets(filters)),
		startAddUserFilter: user => dispatch(startAddUserFilter(user)),
		editUserFilter: (id,user) => dispatch(editUserFilter(id,user)),
		removeUserFilter: id => dispatch(removeUserFilter(id))
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(TweetShowcase);

//todo:filters are not updated and sent through startSetTweets once clicked on RANDOMIZE