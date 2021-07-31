import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

var token = "Bearer c21a99f98f3d64bce53933d23097cbd4fb880ecf476037f82be4c85eb84ce344";
const url = "https://api.lifx.com/v1/lights/all";

class CallAPI extends Component{
    state = {
        label: '',
        id: "",
        dict: "",
    };

    componentDidMount(){
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
          })
            .then(response => response.json())
            .then((lightProps) => {
                console.log(lightProps.length)
                console.log(lightProps[0]['label']);
                this.setState({dict: lightProps})
                this.setState({label: lightProps[0]['label']})
                this.setState({id: lightProps[0]['id']})
                
                for (let i = 0; i < this.state.dict.length; i++){
                    console.log(this.state.dict[i]['label'], "test")
                }
                
              })
            .catch((error) => {
              console.error(error);
            });
    }

    togglePower(){
        const urlPower = "https://api.lifx.com/v1/lights/all/toggle"
        fetch(urlPower, {
            method: 'POST',
            headers: {
                'Authorization': token
            },
          })
            .then(response => response.json())
            .then((powerStatus) => {
                console.log(powerStatus['results'])
                //console.log(powerStatus[0]['id']);
              })
            .catch((error) => {
              console.error(error);
            });
    }

    setLightState(){
        const urlPower = "https://api.lifx.com/v1/lights/d073d5544584/state";
        const data = {
            "power": "off",
        }
        fetch(urlPower, {
            method: "PUT",
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then((lightState) => {
                console.log(lightState['results'])
              })
            .catch((error) => {
              console.error(error);
            });
    }
    render(){
        return (
            <div>
                {/* <Button variant="primary" onClick={this.togglePower}>Toggle Power</Button> */}
                <br></br>
                <br></br>
                <Button variant="primary" onClick={this.setLightState}>Set State</Button>
                <p>Label: {this.state.label}</p>
                <p>ID: {this.state.id}</p>
                <p></p>
            </div>
        )
    }

}

export default CallAPI;