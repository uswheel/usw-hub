import React, { Component } from 'react';

class Table extends Component {
  state = {
    table: null
  }

  componentDidUpdate(oldProps) {
    const data = this.props.data;
    if (data !== oldProps.data) {
      this.createTableBody(data);
    }
  }

  createTableBody() {
    const table = this.props.data.map((item, index) =>
      <tr key={`item${item.id}`}>
        <td>{item.partNumber}</td>
        <td>{item.location}</td>
        <td>{item.rack}</td>
        <td>{item.level}</td>
        <td>{item.column}</td>
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn btn-sm btn-outline-danger dynamic-font2 py-0"
            style={{ fontSize: 'inherit' }}
            onClick={() => this.props.editButton(item.id, index)}
          >Edit</button>
        </td>
      </tr>
    )
    this.setState({ table: table })
  }

  render() {
    return (
      <div className="container">
        {this.state.table ?
          <div className="row">
            <div className="col">
              <table className="table dynamic-font table-striped table-bordered table-sm shadow bg-white shadow">
                <thead>
                  <tr>
                    <th>Pt. No.</th>
                    <th>Loc.</th>
                    <th>Rack</th>
                    <th>Lvl.</th>
                    <th>Col.</th>
                    <th>Qty.</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>{this.state.table}</tbody>
              </table>
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default Table;