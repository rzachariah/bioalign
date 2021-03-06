import React, { Component } from 'react';

import config from '../config';

/* Import Components */
import Button from '../components/Button'
import TaskProgress from '../components/TaskProgress';
import History from '../components/History';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequence: '',
      taskId: '',
      taskStatus: {},
      history: []
    }
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.apiUrl = config.apiUrl;
  }

  /* This lifecycle hook gets executed when the component mounts */
  componentDidMount() {
    this.updateHistory();
    this.timer1 = setInterval(()=> this.updateHistory(), 5000);
    this.timer2 = setInterval(()=> this.updateStatus(), 2000);
  }    

  handleSequenceChange(e) {
    let value = e.target.value;
    const filtered = value
      .toUpperCase()
      .replace(/[^ATCG]+/g, '');
    this.setState({
      sequence: filtered
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const sequence = this.state.sequence;
    console.log(`Submit sequence: ${sequence}`);
    let alignRequest = {
      sequence
    };
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/v1/alignments`, {
      method: "POST",
      body: JSON.stringify(alignRequest),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(data => {
        console.log("POST alignments successful", data);
        console.log(`Updating taskId to ${data.taskId}`);
        this.setState({
          taskId: data.taskId
        });
      })
    })
  }

  updateHistory() {
    fetch(`${this.apiUrl}/api/v1/alignments`)
      .then(response => {
        response.json()
          .then(data => {
            console.log("GET alignments successful", data);
            if (data.items) {
              this.setState({
                history: data.items
              });
            }
          })
      });    
  }

  updateStatus() {
    const taskId = this.state.taskId;
    if (taskId) {
      console.log('Updating task status...');
      fetch(`${this.apiUrl}/api/v1/tasks/${taskId}`)
      .then(response => {
        response.json()
          .then(data => {
            console.log("GET task status successful", data);
            this.setState({
              taskStatus: data
            });
          });
      }); 
    } else {
      console.log('taskId is empty');
    }
  }  

  handleClear(e) {
    console.log('Clear sequence');
    e.preventDefault();
    this.setState({
      sequence: ''
    });
  }

  render() {
    return (

      <form className="container-fluid" onSubmit={this.handleSubmit}>

        <h4> Make an alignment request </h4>
        <input
          type="text"
          className="form-control"
          name="sequence"
          placeholder="Enter DNA sequence"
          value={this.state.sequence}
          onChange={this.handleSequenceChange}
        /> { /* Sequence Input */}

        <Button
          action={this.handleSubmit}
          type={'primary'}
          title={'Submit'}
          style={buttonStyle}
        /> { /* Submit */}

        <Button
          action={this.handleClear}
          type={'secondary'}
          title={'Clear'}
          style={buttonStyle}
        /> {/* Clear the form */}

        <br></br>
        <h4> Task Progress </h4>
        <TaskProgress
          status={this.state.taskStatus}
        />

        <br></br>
        <h4> Completed alignments </h4>
        <History
          alignments={this.state.history}
        />

      </form>

    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
}

export default FormContainer;