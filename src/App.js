import _ from 'lodash';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

/* own modules */
import SearchBar from './components/searchbar/SearchBar.jsx';
import FacebookEvents from './components/facebookevents/facebook_events.jsx';
import EventbriteEvents from './components/eventbrite/Eventbrite.jsx';
import GoogleMap from './components/googleMaps/GoogleMaps.jsx';
import './styles/App.css';
import logo from './styles/logo.svg';
import Facebook_login from './components/fblogin/facebooklogin';




class App extends Component {

  /* constructor */
  constructor (props){
    super(props);
    this.state = {
      userData: {},
      isLoggedIn: false,
      query: "Montreal"
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }



  handleSearch = (term) => {
    this.setState({
      query: term
    });

  }


  /* helper functions */
  handleLoginClick = (res) => {
    this.setState({
      userData: res,
      isLoggedIn: true
    })
    console.log("EXECUTED handleLoginClick");
  };

  handleLogoutClick = () => {
    this.setState({
      userData: {},
      isLoggedIn: false
    })
    console.log("EXECUTED handleLogoutClick");
  };





  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let header = null;
    let body = null;
    const videoQuery = _.debounce((term) => {this.handleSearch(term)}, 300);
    if (isLoggedIn){ //If logged in
      header =
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>{this.state.userData.name}'s Dashboard</h2>
          </div>
        </div>
      body =
        <div>
          <Row>
            <SearchBar
              onSearchTermChange={videoQuery} />
          </Row>
          <Row>
            <Col lg={4} md={4} xs={6}>
                <FacebookEvents
                  userInfo={this.state.userData}
                  query={this.state.query} />

                <EventbriteEvents
                  query={this.state.query} />
            </Col>

            <Col lg={4} md={4} xs={6}>
              <h1> GMAPS </h1>
              <GoogleMap query={this.state.query}/>
            </Col>
            </Row>
        </div>

    }
    else { // If not logged in
      header =
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Facebook_login handleLoginClick={this.handleLoginClick} handleLogoutClick={this.handleLogoutClick} />
      </div>

    }
    return (
          <div>
            {header}
              <div className="container" >
              {body}
              </div>
          </div>

    );
  }
}

export default App;
