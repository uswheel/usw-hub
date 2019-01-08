import React, { Component } from 'react';
import Menu from './Menu';
import Home from './Home';
import Inventory from './Inventory/Search/Search';
import { Route } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Route path="/" exact component={Home} />
        <Route path="/inventory" component={Inventory} />
      </div>
    )
  }
}

export default Main;