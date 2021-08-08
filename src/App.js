import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import Authorise from './Authorise/Authorise';
import { CookiesProvider } from 'react-cookie';

function App() {

  return (
    <div className="App">
      <h1 style={{marginTop: "10px"}}>LifX Light Controller</h1>
      <CookiesProvider>
        <Authorise></Authorise>  
      </CookiesProvider>
    </div>
  );
};

export default App;
