/*global google*/
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const paperStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'transparent'
  },
  containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  };

class App extends Component {
  state = { cities: [], step: 'First', firstName: '', lastName: '', phone: '', email: '' };

  handleUpdateInput = value => {
    if (!value) return;

    const service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: value || '', types: 'cities' }, this.displaySuggestions);
  };

  displaySuggestions = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) return;

    const cities = predictions.map(prediction => prediction.description);

    this.setState({ cities });
  };

  nextStep = () => {
    this.setState({ step: 'Second' });
  };

  backStep = () => {
    this.setState({ step: 'First' });
  };

  updateFirstName = (event) => {
    this.setState({firstName: event.target.value})
  }

  updateLastName = (event) => {
    this.setState({lastName: event.target.value})
  }

  updatePhone = (event) => {
    this.setState({phone: event.target.value})
  }

  updateEmail = (event) => {
    this.setState({email: event.target.value})
  }

  render() {
    const { cities, step, firstName, lastName, phone, email } = this.state;
    return (
      <MuiThemeProvider>
        <Paper style={paperStyles}>
          <AppBar title="FinLeap Contact Form" showMenuIconButton={false} />
          {step === 'First'
            ? <form style={containerStyles}>
                <AutoComplete
                  hintText="Enter your city"
                  dataSource={cities}
                  onUpdateInput={this.handleUpdateInput}
                  style={{ display: 'block', margin: 15}}
                />
                <RaisedButton label="Next" primary={true} style={{ display: 'block', margin: 15}} onClick={this.nextStep} />
              </form>
            : <form style={containerStyles}>
                <TextField hintText="First Name" onChange={this.updateFirstName} value={firstName}/>
                <TextField hintText="Last Name" onChange={this.updateLastName} value={lastName}/>
                <TextField hintText="Phone" onChange={this.updatePhone} value={phone}/>
                <TextField hintText="E-mail" onChange={this.updateEmail} value={email}/>
                <RaisedButton label="Back" primary={false} style={{ display: 'block', margin: 15 }} onClick={this.backStep} />
                <RaisedButton label="Confirm" primary={true} style={{ display: 'block', margin: 15 }} onClick={this.nextStep} />
              </form>}
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
