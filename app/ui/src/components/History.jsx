import React, { Component } from 'react';
import ReactTable from 'react-table'

import config from '../config';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alignments: []
    }
    this.apiUrl = config.apiUrl;
  }

  /* This lifecycle hook gets executed when the component mounts */
  componentDidMount() {
    fetch(`${this.apiUrl}/api/v1/alignments`)
      .then(response => {
        response.json()
          .then(data => {
            console.log("GET alignments successful", data);
            if (data.items) {
              const newState = Object.assign({}, this.state, {
                alignments: data.items
              })
              this.setState(newState);
            }
          })
      })
  }  

  render() {
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
      data={this.state.alignments}
      columns={columns}
      defaultPageSize={10}
      showPagination={false}
    />
  }
}

export default History;
