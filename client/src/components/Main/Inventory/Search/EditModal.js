import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FaArrowRight } from 'react-icons/fa';

class EditModal extends Component {
  state = {
    difference: '-',
    newQuantity: '',
  }


  numberHandler = (e) => {
    const value = e.target.value;
    if (value.length > 4) return;
    const name = e.target.name;
    let difference;
    if (value === '') difference = '-';
    else difference = value - this.props.item.quantity;
    this.setState({
      [name]: value,
      difference: difference
    });
  }

  render() {
    const difference = this.state.difference;
    let differenceText = this.state.difference;
    let color;
    if (difference > 0) {
      differenceText = '+' + differenceText;
      color = 'text-success'
    }
    if (difference < 0) color = 'text-danger'

    return (
      <Modal isOpen={this.props.isOpen} autoFocus toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle} className="py-1">Edit Item</ModalHeader>
        <ModalBody style={{ background: '#e6e6e6' }}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="bg-white shadow mb-4">
                  <table className="table table-sm table-bordered table-striped mb-0 table-white">
                    <thead>
                      <tr>
                        <th>Part Number</th>
                        <th>Loc.</th>
                        <th>Qty.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.props.item.partNumber}</td>
                        <td>{`${this.props.item.location}-${this.props.item.row}-${this.props.item.column}`}</td>
                        <td>{this.props.item.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-auto px-1">Old:</div>
              <div className="col-auto px-2">
                <div className="h4 px-2 py-1 mb-0 bg-white shadow border border-dark rounded">{this.props.item.quantity}</div>
              </div>
              <div className="col-auto px-1"><FaArrowRight /></div>
              <div className="col-auto">
                <div className={color}>{differenceText}</div>
              </div>
              <div className="col-auto px-1">New:</div>
              <div className="col-auto px-1">
                <input type="number" className="form-control" style={{ width: 75 }} name="newQuantity" value={this.state.newQuantity} onChange={this.numberHandler} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="py-1">
          <button className="btn btn-primary">Submit</button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditModal;