import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Login';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => (
            this.props.auth.isAuthenticated ?
              <Main />
              :
              <Redirect to="/login" />
          )} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps)(App);
