import { Component } from "react";
import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

var token = "Bearer c21a99f98f3d64bce53933d23097cbd4fb880ecf476037f82be4c85eb84ce344";

const StyledSlider = withStyles({
    root: {
    },
    track: {

    },
    rail: {

    },
    thumb: {

    },


  })(Slider);



class SetBrightness extends Component{
    state = {
        brightness: "1.0",
        lightInfo: this.props.data.lightInfo
    }


    brightnessSet(){     
        // Set constants for Light ID and Array Index
        const arrIndex = this.props.data.lightLabels.indexOf(this.props.name)
        const lightID = this.props.data.lightInfo[arrIndex]['id'];   

        // Set API Call URL
        const urlState = `https://api.lifx.com/v1/lights/${lightID}/state`;

        // Set data to be updated depending on the selected value on the slider
        const data = {
            "brightness": this.state.brightness
            }

        // CALL API
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
            this.updateColorValue(this.state.brightness, arrIndex)

            // Update Parent State
            this.updateParentState()
    }

    // Method to change the value of the color key
    updateColorValue(brightnessVal, index){
        let lightInfo = this.state.lightInfo;
        lightInfo[index]['brightness'] = brightnessVal;
        this.setState({lightInfo : lightInfo})
    }

    // Updates the main light state in the parent component
    updateParentState(){
        this.props.onGetChildState(this.state.lightInfo);
    }

    valuetext(value) {
        return value;
    }

    sliderChange(event, value){
        console.log(value)
        this.setState({
            brightness: value
        })
        this.brightnessSet()
    }


    render(){
        return (
            <div>
                {/* <Button variant="primary" onClick={this.brightnessSet.bind(this)}>Set Brightness</Button> */}
                <Typography id="non-linear-slider" gutterBottom>
                    Adjust Brightness
                </Typography>
                <StyledSlider
                    defaultValue={this.props.data.lightInfo[this.props.data.lightLabels.indexOf(this.props.name)]['brightness']}
                    getAriaValueText={this.valuetext.bind(this)}
                    onChangeCommitted={this.sliderChange.bind(this)}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.1}
                    marks
                    min={0.0}
                    max={1.0}
                    valueLabelDisplay="off"
                />
            </div>
        )
    }
}

export default SetBrightness;