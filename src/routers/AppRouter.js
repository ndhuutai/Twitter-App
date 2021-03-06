import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import SearchPage from '../components/SeachPage';
import TweetShowCase from '../components/TweetShowcase';
import NotFoundPage from '../components/NotFoundPage';

export default () => (
	<BrowserRouter>
		<div className="body-container">
			<Header/>
			<Switch>
				<Route path="/" exact={true} component={HomePage}/>
				<Route path="/search" component={SearchPage}/>
				<Route path="/randomTweet" component={TweetShowCase}/>
				<Route component={NotFoundPage}/>
			</Switch>
			<div className="bg"></div>
		</div>
	</BrowserRouter>
);
