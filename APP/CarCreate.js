import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class carCreate extends Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      state = { Make: '', Model: '', Year: '', VIN: '', Package: '',Colour: '' , MSRP: '', Photo: '' };
    
      url = "https://desolate-castle-53865.herokuapp.com/api/cars";
    
      handleChange(e) {
        // https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
        // Bottom line, new ES6 feature, bracket notation, computed property names
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
        this.setState({ [e.target.name]: e.target.value });
       

        //console.log(`Name: ${this.state.name}, Job: ${this.state.job}`);
    
        // Can also do data validation in here
      }
    
      componentDidMount() {
        this.input.focus();
      }
    
      handleSubmit(e) {
    
        // Turn off default form handling
        //e.preventDefault();
    
        const newUser = {'_id': this.state.id ,'Make': this.state.Make, 'Model': this.state.Model, 'Year': this.state.Year,'VIN': this.state.VIN, 'Package': this.state.Package, 'Colour': this.state.Colour, 'MSRP': this.state.MSRP, 'Photo': this.state.Photo};
    
        fetch(this.url, {
          method: 'POST',
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(response => {
            if (response.ok) {
              // Parse the response body as JSON
              return response.json();
            } else if (response.status >= 400 && response.status < 500) {
              // Error caused by the requestor
              throw Error(`HTTP ${response.status}, ${response.statusText}`);
            } else {
              // Some other situation
              throw Error(`HTTP ${response.status}, ${response.statusText}`);
            }
          })
          .then(responseData => {
            // "responseData" is an object
            // Study the shape of the data in the reqres.in service
            // Optional...
            console.log(responseData);
            // The identifier "id" can be used to redirect
            this.props.history.push(`/cars`);
          })
          .catch(error => {
            // Handles an error thrown above, as well as network general errors
            console.log(error)
          });
    
      }
    
      render() {
        document.title = 'Add car';
    
        // Determine the button state
        const isDisabled = this.state.Make.length === 0 || this.state.Model.length === 0 || this.state.Year.length === 0 || this.state.VIN.length === 0 || this.state.Colour.length === 0 || this.state.MSRP.length === 0 || this.state.Photo.length === 0;
    
        return (
          <div>
            <h4>Add a new car to the data service</h4>
            {/* <form onSubmit={this.handleSubmit}> */}
            <div className="form-horizontal">
              <p>Enter new car data, and click/tap the Add Car button</p>
              <hr />
              <div className="form-group">
                  <label htmlFor="Make" className='control-label col-md-2'>Make</label>
                  <div className="col-md-6">
                    <input name="Make" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Model" className='control-label col-md-2'>Model</label>
                  <div className="col-md-6">
                    <input name="Model" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Year" className='control-label col-md-2'>Year</label>
                  <div className="col-md-6">
                    <input name="Year" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Vin" className='control-label col-md-2'>VIN</label>
                  <div className="col-md-6">
                    <input name="VIN" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Colour" className='control-label col-md-2'>Colour</label>
                  <div className="col-md-6">
                    <input name="Colour" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Package" className='control-label col-md-2'> Package </label>
                  <div className="col-md-6">
                    <input name="Package" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="MSRP" className='control-label col-md-2'>MSRP</label>
                  <div className="col-md-6">
                    <input name="MSRP" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Photo" className='control-label col-md-2'>Photo</label>
                  <div className="col-md-6">
                    <input name="Photo" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-offset-2 col-md-6">
                    <button disabled={isDisabled}onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                    <Link className='btn btn-default' to='/cars'>Cancel</Link>
                  </div>
                </div>
              </div>
            {/* </form> */}
          </div>
        );
      }
    }
    
    export default withRouter(carCreate);
