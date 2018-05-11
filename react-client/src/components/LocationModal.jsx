import React from 'react';

class LocationModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  onChange(event) {
    this.setState({
      location: event.target.value
    })
  }

  render() {
    // console.log('props.show in LocationModal', this.props.show)
    let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
      in modal component
        <div className="modal-main">
        <br/>
          <span className="text-input"><strong>Enter New Location:</strong></span><input className="text-input" type="text" name="location" value={this.state.location} onChange={this.onChange.bind(this)} />
          <button className="btn" onClick={ (location) => {return this.props.handleClose(this.state.location)} }>Submit</button>
        </div>
      </div>
    );
  }

}

export default LocationModal;