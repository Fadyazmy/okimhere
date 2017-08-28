import React, { Component } from 'react';
import graph from 'fb-react-sdk';

class Pages extends Component {
  constructor(props){
    super(props);

    this.state = {
      pages: [],
      dataReady: false,
      data: this.props.userInfo,
      term: this.props.query
    };
    graph.setAccessToken(this.props.userInfo['accessToken']);
    console.log("1 - QUERY::: "+this.props.query);



  }

  componentDidUpdate() {
  let search = '/search?q='+this.props.query +'&type=event';
  console.log("2 - QUERY::: "+search);
  graph.get(search , function(err, res) {
      this.setState(
          {pages: res,
              dataReady: true}
      );
      console.log("EVENT DETAILS: "+JSON.stringify(res)+ "\nERROR: " + JSON.stringify(err));
  }.bind(this));
}


  render(){

    // console.log("QUERY:" +JSON.stringify(this.props.query));
    // console.log("PRINTING PROPS: "+ JSON.stringify(this.props.data['accessToken']));
    return(<h1> Hello</h1>);
  }
}




export default Pages;
