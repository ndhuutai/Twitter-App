import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import SearchPage from '../components/SeachPage';
import background from '../images/background.jpg';

export default () => (
	<BrowserRouter>
		<div className="body-container">
			<Header/>
			<Switch>
				<Route path="/" exact={true} component={HomePage}/>
				<Route path="/search" component={SearchPage}/>
			</Switch>
			{/*<img src={background} alt=""/>*/}
			<div className="bg"></div>
		</div>
	</BrowserRouter>
);
