import _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';
import configs from './config/config.json';

/* own modules */
import SearchBar from './SearchBar.jsx'
import FacebookEvents from './EventsComponent.jsx'
import EventbriteEvents from './Eventbrite.jsx'

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
        <SearchBar
          onSearchTermChange={videoQuery} />

        <FacebookEvents
          userInfo={this.state.userData}
          query={this.state.query} />

        <EventbriteEvents query={this.state.query} />
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
      appId= {configs.appId}
      autoLoad={true}
      version = 'v2.10'
      fields="name,email,picture"
      callback={this.responseFacebook}
      />
      </div>

    }
    return (
      <div>
        {header}
        {body}
      </div>

    );
  }
}

export default App;
