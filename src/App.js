import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import Authorise from './Authorise/Authorise';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';

const logoLink = "https://cdn.shopify.com/s/files/1/0219/0638/files/lifx_logo_9ae0aa6d-07df-41ba-b96d-0f400323e1b1_140x.png?v=1575366323"

function App() {

  return (
    <div className="App">
      <h1><i style={{fontSize: "30px", marginBottom: "15px", color: "#ffdb59"}} className="lightbulb icon"></i>LifX Light Controller</h1>
      <Authorise></Authorise>  
    </div>
  );
};

export default App;
