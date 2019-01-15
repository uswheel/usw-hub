import React, { Component } from 'react';
import EditModal from './EditModal';

class TableRow extends Component {
  state = {
    isOpen: false,
    partNumber: this.props.item.partNumber,
    location: this.props.item.location,
    row: this.props.item.row,
    column: this.props.item.column,
    quantity: this.props.item.quantity,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const item = this.props.item;
    return (
      <React.Fragment>
        <tr>
          <td id="test">{item.partNumber}</td>
          <td>{`${item.location}-${item.row}-${item.column}`}</td>
          <td>{item.quantity}</td>
          <td>
            <button onClick={this.toggle} className="btn btn-sm btn-outline-danger px-1 py-0 px-lg-2 responsive-text">Edit</button>
          </td>
        </tr>
        <EditModal item={this.props.item} isOpen={this.state.isOpen} toggle={this.toggle} />
      </React.Fragment >
    )
  }
}

export default TableRow;