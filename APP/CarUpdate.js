import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class CarUpdate extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties 

  state = { Make: '', Model: '', Year: '', VIN: '', Package: '',Colour: '' , MSRP: '', Photo: '', httpStatusCode: 0, httpStatusOk: false };

  url = `https://desolate-castle-53865.herokuapp.com/api/cars/${this.props.id}`;


  handleChange(e) {
    // Same as the "add one" use case
    this.setState({[e.target.name]: e.target.value });
    
    // Can also do data validation in here
  }

  componentDidMount() {

    // Get one
    fetch(this.url)
      .then(response => {
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState(responseData);
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  handleSubmit(e) {
    // For coding convenience
    const newUser = {_id: this.props.id ,'Make': this.state.Make, 'Model': this.state.Model, 'Year': this.state.Year,'Vin': this.state.VIN, 'Package': this.state.Package, 'Colour': this.state.Colour, 'MSRP': this.state.MSRP, 'Photo': this.state.Photo, 'Purchaser': this.state.Purchaser, 'Email': this.state.Email, 'Purchase_Date': this.state.Purchase_Date};

    // Edit existing
    fetch(this.url, {
      method: 'PUT',
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
        this.props.history.push('/cars');
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
        document.title = `Car ${this.props.id} Update`;

        // Determine the button state
        const isDisabled = this.state.Make.length === 0 || this.state.Model.length === 0 || this.state.Year.length === 0 || this.state.VIN.length === 0 || this.state.Colour.length === 0 || this.state.MSRP.length === 0 || this.state.Photo.length === 0;

        // For coding convenience, create a shortcut object
        //const u = this.state.user;

        // If "this.input" exists (it will only get rendered if a form exists), set its focus
        if (this.input && this.state.Make.length === 0 && this.state.Model.length === 0 && this.state.Year.length === 0 && this.state.VIN.length === 0 && this.state.Colour.length === 0 && this.state.MSRP.length === 0 && this.state.Photo.length === 0)
            this.input.focus();    
    
     return (
       <div>
        <h4>Update this {this.state.Year} {this.state.Make} {this.state.Model}</h4>

        {this.state.httpStatusOk ? (
          <div className="form-horizontal">
            <p>Edit user data, and click/tap the Save button</p>
            <hr />
            <div className="form-group">
                  <label htmlFor="make" className='control-label col-md-2'>Make</label>
                  <div className="col-md-6">
                    <input name="Make" defaultValue={this.state.Make} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="model" className='control-label col-md-2'>Model</label>
                  <div className="col-md-6">
                    <input name="Model" defaultValue={this.state.Model} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Year" className='control-label col-md-2'>Year</label>
                  <div className="col-md-6">
                    <input name="Year" defaultValue={this.state.Year} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Vin" className='control-label col-md-2'>VIN</label>
                  <div className="col-md-6">
                    <input name="VIN" defaultValue={this.state.VIN} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Colour" className='control-label col-md-2'>Colour</label>
                  <div className="col-md-6">
                    <input name="Colour" defaultValue={this.state.Colour} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="MSRP" className='control-label col-md-2'>MSRP</label>
                  <div className="col-md-6">
                    <input name="MSRP" defaultValue={this.state.MSRP} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Photo" className='control-label col-md-2'>Photo</label>
                  <div className="col-md-6">
                    <input name="Photo" defaultValue={this.state.Photo} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Purcahser" className='control-label col-md-2'>Purchaser</label>
                  <div className="col-md-6">
                    <input name="Purchaser" defaultValue="Purchasers Full Name" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Photo" className='control-label col-md-2'>Email</label>
                  <div className="col-md-6">
                    <input name="Email" defaultValue="Purchaser Email" className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Photo" className='control-label col-md-2'>Purchase Date</label>
                  <div className="col-md-6">
                    <input name="Photo" defaultValue={this.state.Photo} className="form-control" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                   <div className="col-md-offset-2 col-md-6">
                    <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                      <Link className='btn btn-default' to='/cars'>Cancel</Link>
                    </div>
                  </div>
                 </div>
        ) : (
            <div>
              <p>Requested user with identifier {this.props.id} was not found</p>
              <hr />
              <p><Link className='btn btn-default' to='/users'>Show list of users</Link></p>
            </div>
          )}

      </div>
    );

  }
}

export default withRouter(CarUpdate);
