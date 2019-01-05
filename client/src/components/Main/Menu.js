import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" className="shadow mb-4 bg-white border-bottom">
          <NavbarBrand href="/">USW Hub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className={`ml-auto ${window.location.pathname === '/' ? 'active' : null}`}>
                <Link to="/" className="nav-link">Home</Link>
              </NavItem>
              <NavItem className={`ml-auto ${window.location.pathname === '/inventory' ? 'active' : null}`}>
                <Link to="/inventory" className="nav-link">Inventory</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;