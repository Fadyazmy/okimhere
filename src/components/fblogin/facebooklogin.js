/**
 * Created by developer on 9/3/17.
 */
import React, { Component }  from 'react';
import FacebookLogin from 'react-facebook-login';
import configs from '../../config/config.json';
import graph from 'fb-react-sdk';


class Facebook_login extends Component {
    constructor (props){
        super(props);
        this.state = {
            userData: {},
            isLoggedIn: false,
            query: "Montreal"
        };
        this.responseFacebook = this.responseFacebook.bind(this);
        console.log("PROPS TO FB COMPONENT"+ JSON.stringify(this.props.query));
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
            this.props.handleLoginClick(response);
        }
    };


    render(){
        return(
            <FacebookLogin
                appId= {configs.FBappId}
                autoLoad={true}
                version = 'v2.10'
                fields="name,email,picture"
                callback={this.responseFacebook}
            />
        );
    }

}

export default Facebook_login;