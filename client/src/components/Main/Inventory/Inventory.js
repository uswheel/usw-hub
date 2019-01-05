import React, { Component } from 'react';
import Table from './Table';
import axios from 'axios';

class Inventory extends Component {
  state = {
    data: null,
    search: '',
    partSearchInput: ''
  }

  search() {
    axios.get('/db/items', this.state.search)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handler = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="bg-white border rounded p-3 my-3">
                <h1 className="mb-3">Inventory</h1>
                <div className="row">
                  <div className="col">
                    <form>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <input
                              type="text"
                              className="form-control bg-light"
                              name="searchInput"
                              placeholder="Part Number"
                              list="browsers"
                              onChange={this.handler}
                            />
                            <datalist id="browsers">
                              <option value="Internet Explorer" />
                              <option value="Firefox" />
                              <option value="Google Chrome" />
                              <option value="Opera" />
                              <option value="Safari" />
                            </datalist>
                          </div>
                          <div className="col">
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control bg-light"
                                name="searchInput"
                                placeholder="Rack"
                                autoComplete="none"
                                onChange={this.handler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light"
                                name="searchInput"
                                placeholder="Row"
                                autoComplete="none"
                                onChange={this.handler}
                              />
                              <input
                                type="number"
                                className="form-control bg-light"
                                name="searchInput"
                                placeholder="Column"
                                autoComplete="none"
                                onChange={this.handler}
                              />
                            </div>
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
        <Table data={this.state.data} />
      </div>
    )
  }
}

export default Inventory;