import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HostList from './components/host/HostList';
import HostEdit from "./components/host/HostEdit";
import DeviceList from './components/device/DeviceList';
import DeviceView from "./components/device/DeviceView";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/hosts' exact={true} component={HostList}/>
            <Route path='/hosts/:id' component={HostEdit}/>
            <Route path='/devices' exact={true} component={DeviceList}/>
            <Route path='/device/:id' component={DeviceView}/>
          </Switch>
        </Router>
    )
  }
}

export default App;