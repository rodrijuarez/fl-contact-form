import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const paperStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'transparent'
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Paper>
          <AppBar title="FinLeap Contact Form" showMenuIconButton={false} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
