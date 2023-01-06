import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Badge } from 'react-bootstrap';
import AppNavbar from './../AppNavbar';
import { Link } from 'react-router-dom';

class DeviceList extends Component {
    constructor(props) {
            super(props);
            this.state = {devices: []};
    }
    componentDidMount() {
        fetch('/devices?isSaved=true')
            .then(response => response.json())
            .then(data => this.setState({devices: data}));
    }
    
    render() {
        const {devices} = this.state;
        const deviceList = devices.map(device => {
            return <tr key={device.id}>
                <td style={{whiteSpace: 'nowrap'}}>{device.name}</td>
                <td>{device.serial}</td>
                <td>{device.state}</td>
                <td>{device.osType==='ANDROID' ? <img src="android.png"/> : <img src="appleinc.png"/>}</td>
                <td>{device.osVersion}</td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h2>Devices <Badge bg="dark">{devices.length}</Badge></h2>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Serial</th>
                            <th width="20%">State</th>
                            <th width="20%">OS</th>
                            <th width="20%">OS Version</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deviceList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
export default DeviceList;