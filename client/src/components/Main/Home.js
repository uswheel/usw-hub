import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="p-5 border outline rounded shadow bg-white">
          <div className="row">
            <div className="col">
              <h1 className="pb-4">Home</h1>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <div className="pt-4">Welcome!</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;