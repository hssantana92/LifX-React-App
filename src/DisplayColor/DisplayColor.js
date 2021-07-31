import { Component } from "react";
import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

var token = "Bearer c21a99f98f3d64bce53933d23097cbd4fb880ecf476037f82be4c85eb84ce344";

const StyledSlider = withStyles({
    root: {
      color: "white"
    },
    track: {
        height: "1px",
        background: "linear-gradient(90deg, rgba(255,109,0,1) 0%, rgba(255,166,32,1) 16%, rgba(255,198,72,1) 32%, rgba(255,207,151,1) 48%, rgba(254,233,157,1) 64%, rgba(254,248,224,1) 80%, rgba(255,255,255,1) 96%)",
    },
    rail: {
        background: "linear-gradient(90deg, rgba(255,109,0,1) 0%, rgba(255,166,32,1) 16%, rgba(255,198,72,1) 32%, rgba(255,207,151,1) 48%, rgba(254,233,157,1) 64%, rgba(254,248,224,1) 80%, rgba(255,255,255,1) 96%)",
        height: "10px",
    },
    thumb: {
        marginTop: .01,
        border: "1px solid grey",
        color: "black",
        backgroundColor: "white"
    },


  })(Slider);



class DisplayColor extends Component{
    state = {
        lightColor: "3500",
        lightInfo: this.props.data.lightInfo
    }


    switchColor(){     
        // Set constants for Light ID and Array Index
        const arrIndex = this.props.data.lightLabels.indexOf(this.props.name)
        const lightID = this.props.data.lightInfo[arrIndex]['id'];   

        // Set API Call URL
        const urlState = `https://api.lifx.com/v1/lights/${lightID}/state`;

        // Set data to be updated depending on the selected value on the slider
        const data = {
            "color": {
                "kelvin": this.state.lightColor
            }
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
            this.updateColorValue(this.state.lightColor, arrIndex)

            // Update Parent State
            this.updateParentState()
    }

    // Method to change the value of the color key
    updateColorValue(colorVal, index){
        let lightInfo = this.state.lightInfo;
        lightInfo[index]['color']['kelvin'] = colorVal;
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
            lightColor: value
        })
        this.switchColor()
    }


    render(){
        return (
            <div>
                {/* <Button variant="primary" onClick={this.switchColor.bind(this)}>Switch Colour</Button> */}
                <Typography id="non-linear-slider" gutterBottom>
                    Switch Color
                </Typography>
                <StyledSlider
                    defaultValue={this.props.data.lightInfo[this.props.data.lightLabels.indexOf(this.props.name)]['color']['kelvin']}
                    getAriaValueText={this.valuetext.bind(this)}
                    onChangeCommitted={this.sliderChange.bind(this)}
                    aria-labelledby="discrete-slider-small-steps"
                    step={500}
                    marks
                    min={1500}
                    max={4500}
                    valueLabelDisplay="off"
                />
            </div>
        )
    }
}

export default DisplayColor;