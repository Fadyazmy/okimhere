import React, { Component } from 'react';
import graph from 'fb-react-sdk';


class Eventbrite extends Component {
  constructor(props){
    console.log("Eventbrite CONSTRUCTOR!");
    super(props);
    this.state = {
      events: null,
      dataReady: false,
      location: "Montreal",
      data: this.props.userInfo
    };
  }
  render(){
    return (<h1> Eventbrite data here</h1>);
  }




}

export default Eventbrite;
