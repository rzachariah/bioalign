import React, {Component} from 'react';  

/* Import Components */
import SequenceInput from '../components/SequenceInput'; 
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      request: {
        sequence: '',
      },

    }
    this.handleSequence = this.handleSequence.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleSequence(e) {
    console.log('Sequence changed')
    let value = e.target.value;
    const filtered = value
      .toUpperCase()
      .replace(/[^ATCG]+/g, '');
    this.setState( prevState => ({ request : 
      {...prevState.request, sequence: filtered
        }
      }), () => console.log(this.state.request))
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let alignRequest = this.state.request;

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(alignRequest),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        request: {
          sequence: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

          <SequenceInput inputType={'text'}
                   value={this.state.request.sequence} 
                   onChange = {this.handleSequence}
          />
        
          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;