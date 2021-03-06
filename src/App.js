/*global google*/
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
  state = { cities: [], city: '', step: 'First', firstName: '', lastName: '', phone: '', email: '', showSuccessDialog: false };

  handleUpdateInput = searchText => {
    if (!searchText) return;
    this.setState({ city: searchText });

    const service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: searchText || '', types: 'cities' }, this.displaySuggestions);
  };

  displaySuggestions = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) return;

    const cities = predictions.map(prediction => prediction.description);

    this.setState({ cities });
  };

  nextStep = () => this.setState({ step: 'Second' });

  backStep = () => this.setState({ step: 'First' });

  updateFirstName = event => this.setState({ firstName: event.target.value });

  updateLastName = event => this.setState({ lastName: event.target.value });

  updatePhone = event => this.setState({ phone: event.target.value });

  updateEmail = event => this.setState({ email: event.target.value });

  sendUserData = () => {
    const { city, firstName, lastName, phone, email } = this.state;

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city, firstName, lastName, phone, email })
    }).then(() => {
      this.setState({ showSuccessDialog: true });
    });
  };

  isFormValid() {
    const { firstName, lastName, phone, email } = this.state;
    return this.isCityValid() && firstName && lastName && phone && email;
  }

  isCityValid() {
    const { city, cities } = this.state;
    return city && cities.indexOf(city) !== -1;
  }

  handleClose = () => {
    this.setState({ showSuccessDialog: false });
  };

  render() {
    const { cities, city, step, firstName, lastName, phone, email, showSuccessDialog } = this.state;

    const actions = [<FlatButton label="Ok" primary={true} onClick={this.handleClose} />];
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
                  style={{ display: 'block', margin: 15 }}
                  searchText={city}
                />
                <RaisedButton
                  label="Next"
                  primary={true}
                  style={{ display: 'block', margin: 15 }}
                  onClick={this.nextStep}
                  disabled={!this.isCityValid()}
                />
              </form>
            : <form style={containerStyles}>
                <TextField hintText="First Name" onChange={this.updateFirstName} value={firstName} />
                <TextField hintText="Last Name" onChange={this.updateLastName} value={lastName} />
                <TextField hintText="Phone" onChange={this.updatePhone} value={phone} />
                <TextField hintText="E-mail" onChange={this.updateEmail} value={email} />
                <RaisedButton label="Back" primary={false} style={{ display: 'block', margin: 15 }} onClick={this.backStep} />
                <RaisedButton
                  label="Confirm"
                  primary={true}
                  style={{ display: 'block', margin: 15 }}
                  onClick={this.sendUserData}
                  disabled={!this.isFormValid()}
                />
              </form>}
          <Dialog actions={actions} modal={false} open={showSuccessDialog} onRequestClose={this.handleClose}>
            Your data was successfully sent
          </Dialog>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
