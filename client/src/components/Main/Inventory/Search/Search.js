import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';

const initialState = {
  modal: false,
  search: {
    partNumber: '',
    location: '',
    row: '',
    column: ''
  }
}

class Search extends Component {
  state = initialState;

  search = (e) => {
    e.preventDefault();
    const params = { ...this.state.search };
    if (this.isEmpty(params)) return;
    this.setState(initialState);
    this.get(params);
  }

  searchAll = (e) => {
    e.preventDefault();
    this.get({});
  }

  get(params) {
    this.disableButtons();
    axios.get('/db/item', { params: params })
      .then(res => {
        setTimeout(this.enableButtons.bind(this), 100);
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
        setTimeout(this.enableButtons.bind(this), 100);
      })
  }

  disableButtons() {
    const searchButton = document.getElementById('inventory-search-button');
    const allButton = document.getElementById('inventory-all-button');
    searchButton.classList.add('disabled');
    allButton.classList.add('disabled');
  }

  enableButtons = () => {
    const searchButton = document.getElementById('inventory-search-button');
    const allButton = document.getElementById('inventory-all-button');
    searchButton.classList.remove('disabled');
    allButton.classList.remove('disabled');
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj[key] !== '') return false;
    }
    return true;
  }

  textHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const change = { ...this.state.search };
    change[name] = value;
    this.setState({ search: change });
  }

  numberHandler = (e) => {
    const value = e.target.value;
    if (value.length > 2) return;
    const name = e.target.name;
    const change = { ...this.state.search };
    change[name] = value;
    this.setState({ search: change });
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
                        <div className="row mb-4 text-left">
                          <div className="col-12 col-md mb-3">
                            <label >Part Number</label>
                            <input
                              type="text"
                              className="form-control bg-light"
                              name="partNumber"
                              placeholder={`"55-5050"`}
                              value={this.state.search.partNumber}
                              onChange={this.textHandler}
                            />
                          </div>
                          <div className="col-auto mb-3">
                            <label >Location</label>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="location"
                                placeholder="location"
                                value={this.state.search.location}
                                onChange={this.numberHandler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="row"
                                placeholder="row"
                                value={this.state.search.row}
                                onChange={this.numberHandler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light max-width-85"
                                name="column"
                                placeholder="column"
                                value={this.state.search.column}
                                onChange={this.numberHandler}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 col-sm-auto mb-3 mb-sm-0">
                            <button type="submit" className="btn btn-block btn-primary" id="inventory-search-button">Search</button>
                          </div>
                          <div className="col-6 col-sm-auto">
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
      </div>
    )
  }
}

export default Search;