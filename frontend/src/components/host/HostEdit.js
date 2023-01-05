import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Control, Label } from 'react-bootstrap';
import AppNavbar from './../AppNavbar';

class HostEdit extends Component {

    emptyItem = {
        name: '',
        address: '',
        port: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const host = await (await fetch(`/host/${this.props.match.params.id}`)).json();
            this.setState({item: host});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/host' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        await fetch('/host/' + item.id + '/connect', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.history.push('/hosts');
    }
    
    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Host' : 'Add Host'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-3">
                        <Form.Label for="name">Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} placeholder="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label for="address">Address</Form.Label>
                        <Form.Control type="text" name="address" id="address" value={item.address || ''}
                               onChange={this.handleChange} placeholder="address"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label for="port">Port</Form.Label>
                        <Form.Control type="text" name="port" id="port" value={item.port || ''}
                               onChange={this.handleChange} placeholder="port"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" as={Link} to="/hosts">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(HostEdit);