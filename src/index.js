import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import TodoApp from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux";
import reducer from "./reducer.js";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render( (
<BrowserRouter basename={process.env.NODE_ENV === "production" ? "/todo-part-4" : "/"}>    
    <Provider store={store}>
        <TodoApp/>
    </Provider>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();