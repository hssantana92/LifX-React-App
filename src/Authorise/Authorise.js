import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListLights from '../ListLights/ListLights';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const url = "https://api.lifx.com/v1/lights/all";


class Authorise extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        apiKey: this.props.cookies.get('apiKey') || "",
        authorised: this.props.cookies.get('authorised') || false,
        display: this.props.cookies.get('display') || "",
    }


    onInputChange(event){
        this.setState({
            apiKey: event.target.value
        })
        this.props.cookies.set('apiKey', event.target.value, { 
            path: '/' 
        });
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
                });
                this.props.cookies.set('authorised', true, { 
                    path: '/' 
                });
                this.props.cookies.set('display', "none", { 
                    path: '/' 
                });
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

export default withCookies(Authorise);