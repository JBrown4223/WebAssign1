import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
class CarList extends Component {

  // Class properties 

  state = { cars: [] };

  url = "https://desolate-castle-53865.herokuapp.com/api/cars/";

  componentDidMount() {

    // Get all
    fetch(this.url)
      .then(response => {

        if (response.ok)
            return response.json();
        else if (response.status === 404) 
            throw Error('HTTP 404, Not found');
        else 
            throw Error(`HTTP ${response.status}, ${response.statusText}`);
        
      })
      .then(responseData => {
        this.setState({ cars: responseData });
      })
      .catch(error => {
        console.log(error)
      });

  }

  render() {
    document.title = 'Car list';

    return (
      <div>
        <h4>List of all Cars</h4>
        <p><Link className='btn btn-default' to='/cars/create'>Add a new car</Link></p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody cars={this.state.cars} />
        </table>
      </div>
    );
  }
}

export default CarList;


const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>VIN</th>
        <th>Colour</th>
        <th>MSRP</th>
      </tr>
    </thead>
  );
}


  const TableBody = (props) => {
  

    let rows = props.cars.map((car, index) => {
      return (
        <TableRow car={car} key={index} />
      );
    });
  
    return <tbody>{rows}</tbody>
  }
  

  const TableRow = props => {
  
    const u = props.car;
  
    return (
      <tr>
        <td>{u.Make}</td>
        <td>{u.Model}</td>
        <td>{u.Year}</td>
        <td>{u.VIN}</td>
        <td>{u.Colour}</td>
        <td>{u.MSRP}</td>
        <td><Link className='btn btn-default' to={`/cars/detail/${u._id}`}>Details</Link>&nbsp;&nbsp;
        <Link className='btn btn-warning' to={`/cars/edit/${u._id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-danger' to={`/cars/delete/${u._id}`}>Delete</Link></td>
      </tr>
    );
  }