import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth.actions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  login = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user)
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="rounded bg-white border shadow mt-4 p-3">
              <h1 className="mt-2">Login</h1>
              <form className="mt-4 mx-3 mb-2">
                <div className="form-group">
                  <input type="string" className="form-control" placeholder="Email" name="email" onChange={this.handleInput} value={this.state.email} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInput} value={this.state.password} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  aut: state.auth
})

export default connect(mapStateToProps, { login })(Login);