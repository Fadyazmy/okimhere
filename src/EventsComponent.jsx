import React, { Component } from 'react';
import graph from 'fb-react-sdk';
import reactStringReplace from "react-string-replace"

class EventsComponent extends Component {

  constructor(props){
    console.log("EVENTSCOMPONENT CONSTRUCTOR!");
    super(props);
    this.state = {
      events: null,
      dataReady: false,
      location: "Montreal",
      data: this.props.userInfo
    };
  }

  componentDidUpdate(){
    let search = '/search?q='+this.props.query +'&type=event';
    graph.setAccessToken(this.props.userInfo['accessToken']);

    if(this.state.location != this.props.query ){
      console.log("GET: " + search);
      graph.get(search , function(err, res) {
        // console.log("EVENTS Length: "+JSON.stringify(res.data.length)+ "\nERROR: " + JSON.stringify(err));
        this.setState({
          events: res.data,
          location: this.props.query,
          dataReady: true
        }, function(){

          console.log(JSON.stringify(res.data.length) + " FB events found!");
        });

      }.bind(this));
    }
  };

  /* this isnt run for some reason... */
  ComponentWillUpdate(){
    this.state = {
      location: this.props.query
    }
    console.log("JUST UPDATED QUERY TO: " + JSON.stringify(this.state.query));
  }


render() {
  console.log("RENDER");
  let body = null;
    // console.log("LOGGING PAGES_ARR: "+this.state.events.length);
if(this.state.dataReady){
  // console.log("render event length: " + JSON.stringify(this.state.events.length));
    var pages_arr = []
    var i;
    var time;
    for (i=0; i < this.state.events.length; i+=1) {
      time = this.state.events[i].start_time;
      time = reactStringReplace(time, /((?=T).*)/g, (match, i) => (
        <span key={i} >{}</span>
    ));
      pages_arr.push( (<li key={i}> {this.state.events[i].name} | {time} </li>));
    }
    body =
    <div>
      <p>Facebook events in {this.state.location}:</p>
      <ul>
        {pages_arr}
      </ul>
    </div>
  }
  else{
    body = <p> Please input a location </p>
  }
  return (
    <div>
      {body}
    </div>
);

}
}

export default EventsComponent;
