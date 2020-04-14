import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class CarDelete extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { user: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://desolate-castle-53865.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {

    // Get the requested object
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
        this.setState({ user: responseData});
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  handleSubmit(e) {

    // Delete
    fetch(this.url, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // Redirect
        this.props.history.push('/cars');
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Delete car ${this.props.id}`;

    // For coding convenience, create a shortcut object
    const u = this.state.user;
    return (
      <div>
        <h4>Delete user {u.Name} from the reqres.in service</h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
              <dt>Identifier</dt><dd>{u._id}</dd>
                <dt>Make</dt><dd>{u.Make}</dd>
                <dt>Model</dt><dd>{u.Model}</dd>
                <dt>Year</dt><dd>{u.Year}</dd>
                <dt>VIN</dt><dd>{u.VIN}</dd>
                <dt>Car Colour</dt><dd>{u.Colour}</dd>
                <dt>Package</dt><dd>{u.Package}</dd>
                <dt>MSRP</dt><dd>{u.MSRP}</dd>
                <dt>Photo</dt><dd>{u.Photo}</dd>
                <dt>Purchaser</dt><dd>{u.Purchaser}</dd>
                <dt>Email</dt><dd>{u.Email}</dd>
                <dt>Purchase Price</dt><dd>{u.Purchase_Price}</dd>
                <dt>Purchase Date</dt><dd>{u.Purchase_Date}</dd>
              </dl>
            </div>
          </div>

        ) : (
            <p>Requested user was not found</p>
          )}

        <hr />
        <p>Confirm that this user should be deleted, or cancel to return to the list of users</p>
        <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm delete</button>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Cancel</Link></p>
      </div>
    );
  }
}

export default withRouter(CarDelete);
