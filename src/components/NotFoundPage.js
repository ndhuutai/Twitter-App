import React from 'react';
import {Link} from 'react-router-dom';


const NotFoundPage = () => (
	<div className=" alert alert-danger">
		Error: 404 - Page not found. <Link to="/">Go Home</Link>
	</div>
);

export default NotFoundPage;