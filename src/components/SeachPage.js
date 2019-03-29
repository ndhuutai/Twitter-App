import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import SearchForm from './SearchForm';
import {startSetTweets, resetTweets} from '../actions/tweets';
import {setTextFilter, setTypeFilter} from '../actions/filters';
import Tweet from './Tweet';

class SearchPage extends React.Component {

	onClick = (tweet_type) => {
		this.props.setTypeFilter(tweet_type.toLowerCase());
	};

	onChange = (text) => {
		this.props.setTextFilter(text)
	};

	onSubmit = () => {
		if(this.props.tweets) {
			this.props.resetTweets();
		}
		this.props.startSetTweets(this.props.filters);
	};

	render() {
		return (
			<div>
				<SearchForm
					filters={this.props.filters}
					onChange={this.onChange}
					onSubmit={this.onSubmit}
					onClick ={this.onClick}
				/>
				<div className='card-columns'>
					{
						this.props.tweets? this.props.tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>):
							<div>Loading...</div>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
		tweets: state.tweets
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		startSetTweets: tweets => dispatch(startSetTweets(tweets)),
		setTextFilter: text => dispatch(setTextFilter(text)),
		setTypeFilter: tweet_type => dispatch(setTypeFilter(tweet_type)),
		resetTweets: () => dispatch(resetTweets())
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);
