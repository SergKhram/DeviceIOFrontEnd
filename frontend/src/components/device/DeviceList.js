import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Badge, Stack, Form, Col, Row } from 'react-bootstrap';
import AppNavbar from './../AppNavbar';
import { Link } from 'react-router-dom';
import { RiAndroidLine, RiAppleLine } from 'react-icons/ri';
import HttpClient from './../../api/HttpClient';

class DeviceList extends Component {
    defaultHostFilterValue = 'All hosts'
    httpClient = new HttpClient()

    constructor(props) {
            super(props);
            this.state = {devices: [], hosts: [], formIsDisplayed: false, currentDeviceId: null};
    }

    getDevices = (hostId) => {
        this.httpClient.getDevices(hostId, true)
            .then(response => response.json())
            .then(data => this.setState({devices: data}));
    }

    componentDidMount() {
        this.getDevices('')
        this.httpClient.getHosts().then(data => this.setState({hosts: data}))
    }

    onHostChange = (event) => {
      if(event.target.value !== this.defaultHostFilterValue) {
        this.getDevices(event.target.value)
      } else {
        this.getDevices('')
      }
    }

    showForm = (clickedDevice) => {
      let currDevice = this.state.currentDeviceId
      if(currDevice==null) {
        this.setState({currentDeviceId : clickedDevice, formIsDisplayed : !this.state.formIsDisplayed})
      } else {
        if(currDevice!==clickedDevice) {
          this.setState({currentDeviceId : clickedDevice, formIsDisplayed : true})
        } else {
          this.setState({formIsDisplayed : !this.state.formIsDisplayed})
        }
      }
    }

    render() {
        const {devices, hosts, formIsDisplayed, currentDeviceId} = this.state;
        const deviceList = devices.map(device => {
            return <tr key={device.id} onClick={(e) => this.showForm(device.id)}>
                <td style={{whiteSpace: 'nowrap'}}>{device.name}</td>
                <td>{device.serial}</td>
                <td>{device.state}</td>
                <td><h5>{device.osType==='ANDROID' ? <RiAndroidLine /> : <RiAppleLine />}</h5></td>
                <td>{device.osVersion}</td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <Stack direction="horizontal" gap={2}>
                    <Container fluid>
                        <Stack direction="horizontal" gap={2}>
                            <h2>Devices <Badge bg="dark">{devices.length}</Badge></h2>
                            <div className="float-right ms-auto">
                                <Form.Select onChange={this.onHostChange}>
                                  <option defaultValue>{this.defaultHostFilterValue}</option>
                                  {hosts.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                  ))}
                                </Form.Select>
                            </div>
                        </Stack>
                        <Table className="mt-4" responsive="sm">
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
                    {formIsDisplayed && (
                        <Form>
                            <Form.Group>
                                <Form.Label>{devices.find((device) => device.id === currentDeviceId)?.name}</Form.Label>
                            </Form.Group>
                          {/*<Stack>
                          <Button variant="outline-dark" type="submit" className="ms-auto">{currentDeviceId}</Button>
                          </Stack>*/}
                        </Form>
                    )}
                    </Stack>
                </Container>
            </div>
        )
    }
}
export default DeviceList;