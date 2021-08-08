import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import TogglePower from "../TogglePower/TogglePower";
import DisplayColor from "../DisplayColor/DisplayColor";
import LightStatus from "../LightStatus/LightStatus";
import SetBrightness from "../SetBrightness/SetBrightness";


class ListLights extends Component{
    state = {
        lightInfo: "",
        lightLabels: [],
        token: `Bearer ${this.props.apiKey}`,
    }


    componentDidMount(){
        this.getData();
    }

    componenetDidUpdate(){
        console.log("update")
    }

    getData(){
        const url = "https://api.lifx.com/v1/lights/all";
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.state.token
            },
          })
            .then(response => response.json())
            .then((lightProps) => {
 
                this.setState({lightInfo: lightProps})
                
                for (let i = 0; i < this.state.lightInfo.length; i++){
                    var joined = this.state.lightLabels.concat(this.state.lightInfo[i]['label']);
                    this.setState({ lightLabels: joined })
                }             
              })
            .catch((error) => {
              console.error(error);
            });    
    }


    getChildState(data){
        this.setState({lightInfo: data})
    }


    render(){
        return (
            
            <Accordion>
                {this.state.lightLabels.map(listitem => (
                    <Card key={listitem}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} style={{textDecoration: "none"}} variant="link" eventKey={this.state.lightLabels.indexOf(listitem).toString()}>
                                {/* Displays light status component */}
                                <LightStatus data={this.state}  name = {listitem}></LightStatus>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={this.state.lightLabels.indexOf(listitem).toString()}>
                            <Card.Body>
                                {/* Displays the power status and passes the id and power status of this light to the Toggle Power component */}
                                <TogglePower data={this.state} name = {listitem} onGetChildState={this.getChildState.bind(this)}></TogglePower>
                                <br></br>
                                {/* Displays color switcher component */}
                                <DisplayColor data={this.state} name={listitem} onGetChildState={this.getChildState.bind(this)}></DisplayColor>
                                {/* Displays set brightness component */}
                                <SetBrightness data={this.state} name={listitem} onGetChildState={this.getChildState.bind(this)}></SetBrightness>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        )
    }
}

export default ListLights;