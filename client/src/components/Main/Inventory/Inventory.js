import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';
import {
  Route,
  Link
} from 'react-router-dom';
import Search from './Search/Search';
import History from './History/History';

class Inventory extends Component {
  render() {
    const navItemClasses = 'outline bg-white border rounded shadow p-1 h4 m-0';
    return (
      <>
        <div className="container">
          <Navbar light expand className="mb-4 p-0">
            <Nav navbar className="w-100 d-flex justify-content-around">
              <NavItem className={`${navItemClasses} ${window.location.pathname === '/inventory/search' ? 'active underline' : null}`}>
                <Link
                  to={this.props.match.path + '/search'}
                  className="nav-link">
                  Search
              </Link>
              </NavItem>
              <NavItem className={`${navItemClasses} ${window.location.pathname === '/inventory/history' ? 'active underline' : null}`}>
                <Link
                  to={this.props.match.path + '/history'}
                  className="nav-link">
                  History
              </Link>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
        <Route path="/inventory/search" component={Search} />
        <Route path="/inventory/history" component={History} />
      </>
    )
  }
}

export default Inventory;