import { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';
import Typography from '@material-ui/core/Typography';


const StyledGrid = withStyles((theme) => ({
    root: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        margin: "auto",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
          },
          '& hr': {
            margin: theme.spacing(0, 0.5),
          },
    }
}))(Grid);




class LightStatus extends Component {

    render(){
        const arrIndex = this.props.data.lightLabels.indexOf(this.props.name);
        const kelvinNumber = this.props.data.lightInfo[arrIndex]['color']['kelvin']
        var iconColor = ""
        var iconSelector = "lightbulb icon"

        if (kelvinNumber === 4500){
            iconColor = "black"
            iconSelector = "lightbulb outline icon"
        } else if (kelvinNumber === 4000){
            iconColor = "rgb(254,248,224)"
        } else if (kelvinNumber === 3500){
            iconColor = "rgb(254,233,157)"
        } else if (kelvinNumber === 3000){
            iconColor = "rgb(255,207,151)"
        } else if (kelvinNumber === 2500){
            iconColor = "rgb(255,198,72)"
        } else if (kelvinNumber === 2000){
            iconColor = "rgb(255,166,32)"
        } else if (kelvinNumber === 1500){
            iconColor = "rgb(254,109,0)"
        }

        return(            
            <div>
                <StyledGrid container alignItems="center">
                    
                    <Typography style={{padding: "10px", color: "black", textDecoration: "none"}}>{this.props.name}</Typography>
                    <Divider style={{height: "auto"}}  orientation="vertical" flexItem />
                    <FlashOnRoundedIcon style={{color: (this.props.data.lightInfo[arrIndex]['power'] === "on") ? "green" : "#eb2a2a", fontSize: "30px"}}></FlashOnRoundedIcon>
                    <Divider style={{height: "auto"}}  orientation="vertical" flexItem />
                    <i style={{fontSize: "25px", marginBottom: "15px", color: iconColor}} className={iconSelector}></i>
                </StyledGrid>
                
            </div>
        )
    }
}
export default LightStatus;