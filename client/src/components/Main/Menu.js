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
import wheel from './wheel.png';

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

  close = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="shadow mb-4 bg-white border-bottom">
        <div className="container px-0">
          <Navbar light expand="md">
            <NavbarBrand>
              <div>
                <div style={{ height: 25 }} className="d-inline-block mr-1">
                  <img src={wheel} alt="wheel" className="img-fluid h-100 w-auto pb-1" />
                </div>
                USW Hub
            </div>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className={`ml-auto ${window.location.pathname === '/' ? 'active' : null}`}>
                  <Link to="/" className="nav-link" onClick={this.close}>Home</Link>
                </NavItem>
                <NavItem className={`ml-auto ${window.location.pathname === '/inventory' ? 'active' : null}`}>
                  <Link to="/inventory" className="nav-link" onClick={this.close}>Inventory</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Menu;