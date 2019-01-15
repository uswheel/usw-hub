import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {
  state = {
    table: null,
  }

  componentDidUpdate(oldProps) {
    const data = this.props.data;
    if (data !== oldProps.data) {
      this.createTableBody(data);
    }
  }

  createTableBody() {
    const table = this.props.data.map((item) => <TableRow item={item} key={`item${item.id}`} />)
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
                    <th className="sticky-top bg-light">Part Number</th>
                    <th className="sticky-top bg-light">Loc.</th>
                    <th className="sticky-top bg-light">Qty.</th>
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