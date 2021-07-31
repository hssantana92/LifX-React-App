import { Component } from "react";
import Button from 'react-bootstrap/Button';

var token = "Bearer c21a99f98f3d64bce53933d23097cbd4fb880ecf476037f82be4c85eb84ce344";

class TogglePower extends Component{
    state = {
        lightInfo: this.props.data.lightInfo,
    }

    

    togglePower(){
        const lightID = this.props.data.lightInfo[this.props.data.lightLabels.indexOf(this.props.name)]['id'];
        const urlPower = `https://api.lifx.com/v1/lights/${lightID}/toggle`;
        fetch(urlPower, {
            method: 'POST',
            headers: {
                'Authorization': token
            },
          })
            .then(response => response.json())
            .then((powerStatus) => {
              })
            .catch((error) => {
              console.error(error);
            });
    }

    lightSwitch(){
        // Set constants for Light ID, Power Status, and Array Index
        const arrIndex = this.props.data.lightLabels.indexOf(this.props.name)
        const lightID = this.props.data.lightInfo[arrIndex]['id'];
        var powerStatus = this.props.data.lightInfo[arrIndex]['power']

        // If statement to determine whether to turn light off or on
        const changePower = (powerStatus === "on") ? "off" : "on"

        // API Call
        const urlState = `https://api.lifx.com/v1/lights/${lightID}/state`;
        const data = {
            "power": changePower
        }
        fetch(urlState, {   
            method: 'PUT',
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

        // Update State Object
        this.updatePowerValue(changePower, arrIndex)

        // Update Parent State
        this.updateParentState()
    }

    // Method to change the value of the power key
    updatePowerValue(powerStatus, index){
        let lightInfo = this.state.lightInfo;
        lightInfo[index]['power'] = powerStatus;
        this.setState({lightInfo : lightInfo})
    }

    // Updates the main light state in the parent component
    updateParentState(){
        this.props.onGetChildState(this.state.lightInfo);
    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-md-2">
                        <Button variant="primary" onClick={this.lightSwitch.bind(this)}>Toggle Power</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TogglePower;