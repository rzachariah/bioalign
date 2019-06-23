import React, { Component } from 'react';
import ReactTable from 'react-table'

class History extends Component {
  render() {
    console.log('Rendering history');
    const columns = [{
      Header: 'Sequence',
      accessor: 'sequence'
    }, {
      Header: 'Protein Name',
      accessor: 'proteinName'
    }, {
      Header: 'Protein Name',
      accessor: 'proteinPosition'
    }]

    return <ReactTable
      data={this.props.alignments}
      columns={columns}
      defaultPageSize={10}
      showPagination={true}
    />
  }
}

export default History;
