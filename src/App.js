import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <h1>FinLeap Contact Form</h1>
      </MuiThemeProvider>
    );
  }
}

export default App;
