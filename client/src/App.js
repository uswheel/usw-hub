import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Public/Login';
import { connect } from 'react-redux';
import { setUser } from './redux/actions/auth.actions';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class App extends Component {
  state = {
    loading: true
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) this.checkExpired(token);
    else this.setState({ loading: false });
  }

  async checkExpired(token) {
    const currentTime = Date.now() / 1000;
    const decoded = jwt_decode(localStorage.token);
    if (decoded.exp < currentTime) return this.setToken(false);
    this.setToken(token);
    await this.props.setUser(decoded);
    this.setState({ loading: false });
  }

  setToken(token) {
    if (token) axios.defaults.headers.common['Authorization'] = token;
    else delete axios.defaults.headers.common['Authorization'];
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.loading ?
            <Loading />
            :
            <Route path="/" render={() => (
              this.props.auth.isAuthenticated ?
                <Main />
                :
                <Redirect to="/login" />
            )} />
          }
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const Loading = () => {
  return (
    <div>Loading</div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { setUser })(App);
