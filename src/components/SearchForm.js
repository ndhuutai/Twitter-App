import React from 'react';
import capitalize from 'capitalize';

class SearchForm extends React.Component {

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(e.target.input.value);
	};

	onChange = (e) => {
		this.props.onChange(e.target.value);
	};

	onclick = (e) => {
		this.props.onClick(e.target.textContent);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Search Text</label>
						<input type="text" onChange={this.onChange} name="input" className="form-control" placeholder="text to search"/>
					</div>
					<button type="submit" className="btn btn-primary">Search</button>
				</form>

				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
					        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{capitalize(this.props.filters.tweet_type)}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
						<button className="dropdown-item" type="button" onClick={this.onclick}>Recent</button>
						<button className="dropdown-item" type="button" onClick={this.onclick}>Mixed</button>
						<button className="dropdown-item" type="button" onClick={this.onclick}>Popular</button>
					</div>
				</div>
			</div>
		)
	}
}





export default SearchForm;