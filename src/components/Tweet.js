import React from 'react';
import moment from 'moment';

export default (props) => (
	<div className="card">
		{/*<img className="card-img-top" src{} alt="Card image cap"/>*/}
			<div className="card-body">
				<h5 className="card-title">{props.user.name}</h5>
				<p className="card-text">{props.text}</p>
				<p className="card-text">
					<small className="text-muted">{moment(props.createdAt).format('ddd MMM Do, YYYY @ h A')}</small>
				</p>
			</div>
	</div>
)