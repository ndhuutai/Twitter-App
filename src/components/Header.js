import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
	<div>
		<h1 className="text-center">Twitter Showcase</h1>
		<div className="container-fluid">
			<div className="row">
				<NavLink to="/" exact={true} className="nav-link col-sm text-center" activeClassName="active">Home</NavLink>
				<NavLink to="/search" className="nav-link col-sm text-center" activeClassName="active">User Search</NavLink>
				<NavLink to="/randomTweet" className="nav-link col-sm text-center" activeClassName="active">Tweet Showcase</NavLink>
			</div>
		</div>
	</div>
);
