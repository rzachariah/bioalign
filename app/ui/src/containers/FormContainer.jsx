import React, { Component } from 'react';

/* Import Components */
import Button from '../components/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequence: ''
    }
    this.handleSequenceChange = this.handleSequenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleSequenceChange(e) {
    let value = e.target.value;
    const filtered = value
      .toUpperCase()
      .replace(/[^ATCG]+/g, '');
    this.setState({ sequence: filtered });
  }

  handleSubmit(e) {
    e.preventDefault();
    const sequence = this.state.sequence;
    console.log(`Submit sequence: ${sequence}`);
    let alignRequest = {
      sequence
    };
    fetch('http://example.com', {
      method: "POST",
      body: JSON.stringify(alignRequest),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      })
    })
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

      </form>

    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
}

export default FormContainer;