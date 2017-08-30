import _ from 'lodash';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

/* own modules */
import SearchBar from './components/searchbar/SearchBar.jsx';
import FacebookEvents from './components/facebookevents/facebook_events.jsx';
import EventbriteEvents from './components/eventbrite/Eventbrite.jsx';
import GoogleMap from './components/googleMaps/GoogleMaps.jsx';
import configs from './config/config.json';
import './styles/App.css';
import logo from './styles/logo.svg';




class App extends Component {

  /* constructor */
  constructor (props){
    super(props);
    this.state = {
      userData: {},
      isLoggedIn: false,
      query: "Montreal"
    };
    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /* helper functions */
  handleLoginClick = (res) => {
    this.setState({
      userData: res,
      isLoggedIn: true
    })
  }

  handleLogoutClick = () => {
    this.setState({
      userData: {},
      isLoggedIn: false
    })
  }

  handleSearch = (term) => {
    this.setState({
      query: term
    });

  }

  /* fb callback to handle response */
  responseFacebook = (response) => {
    if (response.expiresIn === undefined) {
      console.log("Something went wrong. Don't set userData");
      console.log("Error Response:");
      console.log(response);
        }
    else {
      console.log("response:");
      console.log(response);
      graph.setAccessToken(response['accessToken']);
      this.handleLoginClick(response);
    }
  }



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
          <Col xs={8} md={2} >
            <SearchBar
              onSearchTermChange={videoQuery} />

            <FacebookEvents
              userInfo={this.state.userData}
              query={this.state.query} />

            <EventbriteEvents
              query={this.state.query} />
          </Col>
          <Col xs={4} md={4} >
          <h1> GMAPS </h1>
          </Col>
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
        <FacebookLogin
      appId= {configs.FBappId}
      autoLoad={true}
      version = 'v2.10'
      fields="name,email,picture"
      callback={this.responseFacebook}
      />
      </div>

    }
    return (
        <div>
          <div>
            {header}
            {body}
          </div>
          <div style={{width: '100%', height: '400px'}}>
            <GoogleMap query={this.state.query}/>
          </div>
        </div>

    );
  }
}

export default App;
