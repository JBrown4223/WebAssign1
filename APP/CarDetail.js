import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';


class carDetail extends Component {

  // Class properties 

  state = { user: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://desolate-castle-53865.herokuapp.com/api/cars/${this.props.id}`;

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
        this.setState({ user: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    
    // For coding convenience, create a shortcut object
    const u = this.state.user;

    document.title = `Car ${u._id} detail`;

    return (
      <div>
        <h4>Detail {u.Year} {u.Make} {u.Model} car from the reqres.in service</h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

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
                <dt>Photo</dt><dd><img src={u.Photo} width="50" height="50"></img></dd>
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
         <p><Link className='btn btn-warning' to={`/cars/edit/${u._id}`}>Edit</Link>&nbsp;&nbsp;
         <Link className='btn btn-default' to='/cars'>Show All Cars</Link></p>
      </div>
    );
  }
}

export default carDetail;
