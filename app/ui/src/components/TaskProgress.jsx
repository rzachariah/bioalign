import React, { Component } from 'react';
import ReactTable from 'react-table'

class TaskProgress extends Component {
  render() {
    console.log('Rendering TaskProgress', this.props.status);
    //this.updateStatus(this.props.taskId);
    const columns = [{
      Header: 'TaskId',
      accessor: 'taskId'
    }, {
      Header: 'Sequence',
      accessor: 'sequence'
    }, {
      Header: 'Status',
      accessor: 'status'
    }]

    return <ReactTable
      data={[this.props.status]}
      columns={columns}
      defaultPageSize={3}
      showPagination={false}
    />
  }
}

export default TaskProgress;
