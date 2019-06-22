import React, {Component} from 'react';  

/* Import Components */
import Input from '../components/Input';  
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
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  
  handleSequence(e) {
   let value = e.target.value;
   this.setState( prevState => ({ request : 
        {...prevState.request, sequence: value
        }
      }), () => console.log(this.state.request))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ request : 
        {...prevState.request, [name]: value.toUpperCase()
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
       
            <Input inputType={'text'}
                   title= {'DNA sequence'} 
                   name= {'sequence'}
                   value={this.state.request.sequence} 
                   placeholder = {'Enter DNA sequence'}
                   handleChange = {this.handleInput}
                   
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