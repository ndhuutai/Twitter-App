import {combineReducers,applyMiddleware,compose,createStore} from 'redux';
import filtersReducer from '../reducers/filtersReducer';
import tweetsReducer from '../reducers/tweetsReducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			filters: filtersReducer,
			tweets: tweetsReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
}