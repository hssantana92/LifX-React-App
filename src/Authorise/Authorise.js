import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListLights from '../ListLights/ListLights';

const url = "https://api.lifx.com/v1/lights/all";

class Authorise extends Component{
    state = {
        apiKey: "",
        authorised: false,
        display: "",
    }

    onInputChange(event){
        this.setState({
            apiKey: event.target.value
        })
    }

    onKeySubmit(){
        // Attempt to call API
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.state.apiKey}`
            },
          })
            .then(function(response){
                if (!response.ok){
                    alert("Invalid key. Try again.")
                    throw new Error("HTTP Status " + response.status);
                }
                return response.json();
            })
            .then((jsonResponse) => {
                this.setState({
                    authorised: true,
                    display: "none"
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render(){
        const isAuthorised = this.state.authorised;
        let displayComponent;

        if (isAuthorised){
            displayComponent = <ListLights apiKey={this.state.apiKey}></ListLights>
        };
        return (
            <div>
            <div style={{width:"300px", margin: "auto", display: this.state.display}}>
                <Form>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>API Key</Form.Label>
                        <Form.Control type="text" placeholder="Enter API key" onChange={this.onInputChange.bind(this)} />
                        <Form.Text className="text-muted">
                            Please enter a valid LifX API key
                        </Form.Text>
                        <Button style={{marginTop: "10px"}} variant="primary" onClick={this.onKeySubmit.bind(this)}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
                
            </div>
                {displayComponent}
            </div>
        )
    }

}

export default Authorise;