import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth.actions';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  login = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(user)
      .then(() => window.location.href = '/')
      .catch(err => console.log(err));
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center mt-2">USW-Hub Login</h1>
            <form className="border m-3 p-3 rounded shadow">
              <div className="form-group">
                <input type="string" className="form-control" placeholder="Username" name="username" onChange={this.handleInput} value={this.state.username} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInput} value={this.state.password} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
            </form>
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