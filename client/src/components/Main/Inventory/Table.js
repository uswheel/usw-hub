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
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{item.partNumber}</td>
        <td>{item.location}</td>
        <td>{item.rack}</td>
        <td>{item.level}</td>
        <td>{item.column}</td>
        <td>{item.quantity}</td>
      </tr>
    )
    this.setState({ table: table })
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.table ?
          <div className="row">
            <div className="col">
              <table className="table table-striped table-bordered table-sm shadow bg-white">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Part Number</th>
                    <th>Location</th>
                    <th>Rack</th>
                    <th>Level</th>
                    <th>Column</th>
                    <th>Quantity</th>
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