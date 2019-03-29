import React from 'react';

class UserInput extends React.Component {

	onChange = (e) => {
		this.props.onChange(this.props.id,e.target.value);
	};

	onClick = (e) => {
		this.props.onRemove(this.props.id);
	};

	render() {
		return (
			<div>
				<div className="input-group mb-3">
					<input type="text"
					       className="form-control"
					       value={this.props.user}
					       onChange={this.onChange}
					/>
					<div className="input-group-append">
						<button className="btn btn-danger" type="button" onClick={this.onClick}>X</button>
					</div>
				</div>
			</div>
		);
	}
}

export default UserInput;