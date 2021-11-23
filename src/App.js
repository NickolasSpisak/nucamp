import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-lobster';
import 'typeface-open-sans';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';


class App extends Component {
    render() {
        return (
           <BrowserRouter>
           <div className="App">
                <Main />
            </div>
            </BrowserRouter>
        );
    }
  }



export default App;
