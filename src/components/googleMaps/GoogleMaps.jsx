import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import configs from '../../config/config.json'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 40, width: 60, top: -20, left: -30,
    }}>
        {text}
    </div>
);

export default class SimpleMap extends React.Component {

    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 11,
        placeholder: React.PropTypes.string,
        onPlacesChanged: React.PropTypes.func
    };
    onPlacesChanged = () => {
        if (this.props.onPlacesChanged) {
            this.props.onPlacesChanged(this.SimpleMap.getPlaces());
        }
    };

    createMapOptions = (maps) => {
        return {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
        }
    };


        render()
        {
            return (
                <GoogleMapReact
                    bootstrapURLKeys={configs.GoogleMapsAPIKey}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    address="montreal, canada"
                    options={this.createMapOptions}
                >
                    <AnyReactComponent

                        text={'Kreyser Avrora'}
                    />
                </GoogleMapReact>
            );
        }
    }


