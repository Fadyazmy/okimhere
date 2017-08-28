import React, { Component } from 'react';
import graph from 'fb-react-sdk';
import axios from 'axios';
import configs from './config/config.json';

class Eventbrite extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: null,
      dataReady: false,
      location: "Montreal"
    };
  }

  /* this isnt run for some reason... */
  ComponentWillUpdate(){
    this.state = {
      location: this.props.query
    }
    console.log("JUST UPDATED QUERY TO: " + JSON.stringify(this.state.query));
  }


  componentDidUpdate(){
    let search = "https://www.eventbriteapi.com/v3/events/search/?token="+ configs.EventbriteToken+ '&location.address=' + this.props.query ;
    console.log("EVENTBRITE QUERY: " + search);
    if(this.state.location != this.props.query ){
      console.log("GET: " + search);
      axios.get(search)
      .then(function(res) {
        // console.log("EVENTS Length: "+JSON.stringify(res.data.length)+ "\nERROR: " + JSON.stringify(err));
        // console.log("PRINTING OUT EVENTBRITE RESULT: " + JSON.stringify(res.data.events));
        this.setState({
          events: res.data.events,
          location: this.props.query,
          dataReady: true
        }, function(){

          console.log(JSON.stringify(res.data.events.length) + " EVENTBRITE events found!");
        });

      }.bind(this))
      .catch(function (error) {
        console.log("EVETBRITE ERROR: "+error);
  });;
    }
  };


  render(){
    console.log("RENDER");
    let body = null;
      if(this.state.dataReady){
        console.log("ITER x: " + JSON.stringify(this.state.events.length));
        var pages_arr = []
        var i;
        var time;
        for (i=0; i < this.state.events.length; i+=1) {
          pages_arr.push( (<li key={i}> {this.state.events[i].name.text} </li>));
        }
        body =
          <div>
            <p>Eventbrite events in {this.state.location}:</p>
            <ul>
              {pages_arr}
            </ul>
          </div>
      }
      else{
          body = <p> Loading .. </p>
      }

      return (
        <div>
          {body}
        </div>
    );
  }




}

export default Eventbrite;
