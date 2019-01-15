import React, { Component } from 'react';
import Moment from 'react-moment';

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
    const table = this.props.data.map((item) => {
      let color;
      let change;
      if (item.change > 0) {
        change = '+' + item.change
        color = 'text-success';
      }
      if (item.change < 0) {
        change = item.change;
        color = 'text-danger';
      }
      const time = item.updatedAt;
      return (
        <React.Fragment key={`history-${item.id}`}>
          <tr>
            <td>{item.partNumber}</td>
            <td>{`${item.location}-${item.row}-${item.column}`}</td>
            <td className={color}>{change}</td>
            <td>{item.user}</td>
            <td><Moment format="MMM D, H:MM">{time}</Moment></td>
          </tr>
        </React.Fragment >
      )
    })
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
                    <th>Part Number</th>
                    <th>Loc.</th>
                    <th>+/-</th>
                    <th>User</th>
                    <th>Time</th>
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