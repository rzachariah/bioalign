import React, { Component } from 'react';
import ReactTable from 'react-table';
import Moment from 'moment';

class History extends Component {
  render() {
    console.log('Rendering history');
    const columns = [{
      Header: 'Date',
      accessor: 'date',
      show: false
    }, {
      Header: 'Time',
      id: "time",
      accessor: d => {
        return Moment(d.time)
          .local()
          .fromNow();
      }
    }, {
      Header: 'Time2',
      id: "time2",
      accessor: d => new Date(d),
      show: false
    }, {
      Header: 'DNA Sequence',
      accessor: 'sequence'
    }, {
      Header: 'Matching Protein',
      accessor: 'proteinName'
    }, {
      Header: 'Protein Position',
      accessor: 'proteinPosition'
    }, {
      Header: 'TaskId',
      accessor: 'taskId'
    }]

    return <ReactTable
      data={this.props.alignments}
      columns={columns}
      defaultSorted={[
        {
          id: "time2",
          desc: true
        }
      ]}
      defaultPageSize={10}
      showPagination={true}
    />
  }
}

export default History;
