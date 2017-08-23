/*global google*/
import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

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
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  };

class App extends Component {
  state = { cities: [] };

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

  render() {
    const { cities } = this.state;
    return (
      <MuiThemeProvider>
        <Paper style={paperStyles}>
          <AppBar title="FinLeap Contact Form" showMenuIconButton={false} />
          <form style={containerStyles}>
            <AutoComplete hintText="Enter your city" dataSource={cities} onUpdateInput={this.handleUpdateInput} />
          </form>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
