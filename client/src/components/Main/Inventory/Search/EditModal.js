import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class EditModal extends Component {
  state = {
    quantity: '',
    difference: 0
  }

  handler = (e, itemQuantity) => {
    const value = e.target.value;
    if (value.length > 5) return;
    const name = e.target.name;
    let difference = Number(value) - Number(itemQuantity);
    if (value === '') difference = '-';
    this.setState({
      [name]: value,
      difference: difference
    });
  }

  render() {
    let differenceColor;
    let differenceText;
    const difference = this.state.difference;
    if (difference > 0) {
      differenceColor = 'text-success';
      differenceText = '+' + this.state.difference;
    }
    if (difference < 0) {
      differenceColor = 'text-danger';
      differenceText = this.state.difference;
    }
    if (difference === 0) differenceText = '-';
    let itemInfo = null;
    if (this.props.item) {
      const item = this.props.item.data;
      itemInfo = (
        <>
          <table className="table dynamic-font table-striped table-bordered table-sm shadow bg-white shadow mb-3">
            <thead>
              <tr>
                <th>Pt. No.</th>
                <th>Loc.</th>
                <th>Rack</th>
                <th>Lvl.</th>
                <th>Col.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.partNumber}</td>
                <td>{item.location}</td>
                <td>{item.rack}</td>
                <td>{item.level}</td>
                <td>{item.column}</td>
              </tr>
            </tbody>
          </table>
          <div className="border p-2 rounded shadow">
            <div className="row">
              <div className="col h4 mb-4 mt-2">Quantity</div>
            </div>
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-auto">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{ width: 60 }}>Old</span>
                    </div>
                    <div className="d-inline-block border px-3 rounded-right h3 mb-0" style={{ width: 100 }} >
                      {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center align-items-center mb-2">
                <div className="col-auto">
                  <div className="h3 mb-0">↓</div>
                </div>
                <div className={`col-auto ${differenceColor}`}>{differenceText}</div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-auto p-0">
                  <div className="input-group input-group-lg mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{ width: 70 }}>New</span>
                    </div>
                    <input
                      type="number"
                      className="form-control text-center h2"
                      value={this.state.quantity}
                      name="quantity"
                      onChange={(e) => this.handler(e, item.quantity)}
                      style={{ width: 110 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }

    return (
      <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} centered>
        <ModalHeader toggle={this.props.toggle}>Edit Item</ModalHeader>
        <ModalBody>{itemInfo}</ModalBody>
        <ModalFooter><button className="btn btn-primary" onClick={this.props.editSubmit}>Submit</button></ModalFooter>
      </Modal>
    )
  }
}

export default EditModal;