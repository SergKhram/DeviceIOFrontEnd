import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import AppNavbar from './../AppNavbar';
import { Link } from 'react-router-dom';

class DeviceList extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>DeviceList</Container>
            </div>
        )
    }
}
export default DeviceList;