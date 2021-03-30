
// IMPORT ALL CSS FILES  

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/styles/rsuite-default.css';


import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchProducts } from './actions/Products'; 
//import { createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from "./reducers";

//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));



const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
));

store.dispatch(fetchProducts());


ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </Provider>,

  rootElement);

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

