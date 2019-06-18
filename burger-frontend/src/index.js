import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import layout from './store/reducers/layout';
import auth from './store/reducers/auth';
import checkout from './store/reducers/checkout';
import {BrowserRouter} from "react-router-dom";
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBurgerBuilder, watchCheckout, watchOrder} from "./store/sagas";

const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder,
    order,
    layout,
    auth,
    checkout
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchCheckout);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
