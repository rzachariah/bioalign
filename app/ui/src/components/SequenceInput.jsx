import React from 'react';

class SequenceInput extends React.Component {
    render() {
    return (
        <div className="form-group">
            <label className="form-label">DNA sequence</label>
            <input 
                {...this.props} 
                type="text"
                className="form-control"
                name="sequence"
                placeholder="Enter DNA sequence"
            />
        </div>
    )
  }
}

export default SequenceInput