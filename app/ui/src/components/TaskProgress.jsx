import React, { Component } from 'react';
import ReactTable from 'react-table'

class TaskProgress extends Component {
  render() {
    console.log('Rendering TaskProgress', this.props.status);
    const columns = [{
      Header: 'TaskId',
      accessor: 'taskId'
    }, {
      Header: 'DNA Sequence',
      accessor: 'sequence'
    }, {
      Header: 'Status',
      accessor: 'status'
    }]

    return <ReactTable
      data={[this.props.status]}
      columns={columns}
      defaultPageSize={1}
      showPagination={false}
    />
  }
}

export default TaskProgress;
