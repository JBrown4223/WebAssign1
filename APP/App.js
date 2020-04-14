import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import CarList from './CarList';
import CarDetail from './CarDetail';
import CarCreate from './CarCreate';
import CarUpdate from './CarUpdate';
import CarDelete from './CarDelete';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar className="navbar navbar-default" />
        <hr />

        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/cars' render={() => (<CarList />)} />
          <Route exact path='/cars/create' render={() => (<CarCreate />)} />
          <Route exact path='/cars/detail/:id' render={(props) => (<CarDetail id={props.match.params.id} />)} />
          <Route exact path='/cars/edit/:id' render={(props) => (<CarUpdate id={props.match.params.id} />)} />
          <Route exact path='/cars/delete/:id' render={(props) => (<CarDelete id={props.match.params.id} />)} />
          <Route render={() => (<NotFound />)} />
        </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2020, Jonathan Brown</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="header">
      <div className="row">
        <h2>BTI425 Assignment 1</h2>
        <h4>Car Listing Database</h4>
      </div>
    </div>
  );
}

// Function component for the navigation bar 
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to='/' className='navbar-brand'>Home page</Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link to='/cars'>Cars</Link>
          </li>
          <li>
            <Link to='/cars/create'>Add A Car</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}

const Home = () => {
  return (
    <div>
      <p>This is the home page of the app.</p>
      <p>Server Link -> https://desolate-castle-53865.herokuapp.com/</p>
      <p>App Link -> https://pacific-meadow-74696.herokuapp.com/</p>
      
      <p>&nbsp;</p>
    </div>
  );
}

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
}