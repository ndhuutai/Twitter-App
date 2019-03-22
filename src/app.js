import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/js/dist/dropdown'
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import {Provider} from 'react-redux';


const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter/>
	</Provider>
);

store.subscribe(() => {
	console.log(store.getState());
});

ReactDOM.render(jsx, document.getElementById('app'));