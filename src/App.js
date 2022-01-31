import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-lobster';
import 'typeface-open-sans';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
    render() {
        return (
           <Provider store={store}>
           <BrowserRouter>
           <div className="App">
                <Main />
            </div>
            </BrowserRouter>
        </Provider>
        );
    }
  }



export default App;
