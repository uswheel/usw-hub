import React, { Component } from 'react'
import Table from './Table';
import axios from 'axios';

const initialState = {
  search: {
    partNumber: '',
    user: '',
    location: '',
    row: '',
    column: '',
    startDay: '1',
    startMonth: '',
    startYear: '2019',
    endDay: '1',
    endMonth: '',
    endYear: '2019'
  }
}

class History extends Component {
  state = initialState;

  componentDidMount() {
    axios.get('/db/history')
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err));
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
    const name = e.target.name;
    if (name === 'row' || name === 'column' || name === 'startDay' || name === 'endDay') {
      if (value.length > 2) return;
    }
    if (name === 'startYear' || name === 'endYear') {
      if (value.length > 4) return;
    }
    const change = { ...this.state.search };
    change[name] = value;
    this.setState({ search: change });
  }

  selectHandler = (e) => {
    const value = e.target.value;
    const change = { ...this.state.search };
    const name = e.target.name;
    change[name] = value;
    this.setState({ search: change });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="bg-white border rounded shadow p-4 mb-4 text-left">
                <form autoComplete="off" onSubmit={this.search}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
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
                      <div className="col-12 col-sm-auto mb-3">
                        <label >User</label>
                        <input
                          type="text"
                          className="form-control bg-light"
                          name="User"
                          placeholder={`"name"`}
                          value={this.state.search.user}
                          onChange={this.textHandler}
                        />
                      </div>
                      <div className="col-12 col-sm-auto mb-3">
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
                      <div className="col-6 col-sm-auto mb-3">
                        <label>Date - Start</label>
                        <div>
                          <select name="startMonth" value={this.state.search.startMonth} onChange={this.selectHandler} className="form-control mr-2 max-width-115">
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                          </select>
                          <small className="text-muted">Month</small>
                        </div>
                        <input
                          type="number"
                          className="form-control bg-light max-width-115"
                          name="startDay"
                          value={this.state.search.startDay}
                          onChange={this.numberHandler}
                        />
                        <small className="text-muted">Day</small>
                        <div>
                          <input
                            type="number"
                            className="form-control bg-light max-width-115"
                            name="startYear"
                            value={this.state.search.startYear}
                            onChange={this.numberHandler}
                          />
                          <small className="text-muted">Year</small>
                        </div>
                      </div>
                      <div className="col-6 col-sm-auto mb-3">
                        <label >Date - End</label>
                        <div>
                          <select name="endMonth" value={this.state.search.endMonth} onChange={this.selectHandler} className="form-control mr-2 max-width-115">
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                          </select>
                          <small className="text-muted">Month</small>
                        </div>
                        <input
                          type="number"
                          className="form-control bg-light max-width-115"
                          name="endDay"
                          value={this.state.search.endDay}
                          onChange={this.numberHandler}
                        />
                        <small className="text-muted">Day</small>
                        <div>
                          <input
                            type="number"
                            className="form-control bg-light max-width-115"
                            name="endYear"
                            value={this.state.search.endYear}
                            onChange={this.numberHandler}
                          />
                          <small className="text-muted">Year</small>
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
        <Table data={this.state.data} />
      </>
    )
  }
}

export default History;