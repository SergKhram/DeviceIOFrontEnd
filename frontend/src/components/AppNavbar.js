import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="https://github.com/SergKhram/DeviceIO">DeviceIO</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/hosts">Hosts</Nav.Link>
                    <Nav.Link as={Link} to="/devices">Devices</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    }
}