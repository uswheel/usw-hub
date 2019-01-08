import React, { Component } from 'react';
import './Search.scss';
import axios from 'axios';
import Table from './Table';
import EditModal from './EditModal';

const initialState = {
  modal: false,
  partNumber: '',
  location: '',
  rack: '',
  level: '',
  column: ''
}

class Inventory extends Component {
  state = initialState;

  query(params) {
    const searchButton = document.getElementById('inventory-search-button');
    const allButton = document.getElementById('inventory-all-button');
    searchButton.classList.add('disabled');
    allButton.classList.add('disabled');
    axios.get('/db/items', { params: params })
      .then(res => {
        searchButton.classList.remove('disabled');
        allButton.classList.remove('disabled');
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
        searchButton.classList.remove('disabled');
        allButton.classList.remove('disabled');
      })
  }

  search = (e) => {
    e.preventDefault();
    const params = {};
    if (this.state.partNumber !== '') params.partNumber = this.state.partNumber;
    if (this.state.location !== '') params.location = this.state.location;
    if (this.state.rack !== '') params.rack = this.state.rack;
    if (this.state.level !== '') params.level = this.state.level;
    if (this.state.column !== '') params.column = this.state.column;
    if (this.isEmpty(params)) return;
    this.setState(initialState);
    this.query(params);
  }

  searchAll = (e) => {
    e.preventDefault();
    this.query({});
  }


  editSubmit = (e, newQuantity) => {
    e.preventDefault();
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  textHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  numberHandler = (e) => {
    const value = e.target.value;
    if (value.length > 2) return;
    const name = e.target.name;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  editButton = (itemId, index) => {
    const data = this.state.data[index];
    this.setState({
      modal: !this.state.modal,
      editItem: {
        itemId: itemId,
        data: data,
        index: index
      }
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="bg-white border rounded shadow p-4 mb-4">
                <div className="row">
                  <div className="col">
                    <form autoComplete="off" onSubmit={this.search}>
                      <div className="form-group">
                        <div className="row mb-4">
                          <div className="col-12 col-sm-6 col-md mb-2">
                            <input
                              type="text"
                              className="form-control bg-light"
                              name="partNumber"
                              placeholder="Part Number"
                              value={this.state.partNumber}
                              onChange={this.textHandler}
                            />
                          </div>
                          <div className="col-12 col-sm-6 col-md mb-2">
                            <input
                              type="text"
                              className="form-control bg-light"
                              name="location"
                              placeholder="Location"
                              value={this.state.location}
                              onChange={this.textHandler}
                            />
                          </div>
                          <div className="col-auto">
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="rack"
                                placeholder="Rack"
                                value={this.state.rack}
                                onChange={this.numberHandler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="level"
                                placeholder="Level"
                                value={this.state.level}
                                onChange={this.numberHandler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="column"
                                placeholder="Column"
                                value={this.state.column}
                                onChange={this.numberHandler}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3 mb-sm-0">
                            <button type="submit" className="btn btn-block btn-primary" id="inventory-search-button">Search</button>
                          </div>
                          <div className="col-12 col-sm-auto">
                            <button className="btn btn-block btn-primary" id="inventory-all-button" onClick={this.searchAll}>All Inventory</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={this.state.data} editButton={this.editButton} />
        <EditModal
          toggle={this.toggle}
          isOpen={this.state.modal}
          item={this.state.editItem} />
      </div>
    )
  }
}

export default Inventory;