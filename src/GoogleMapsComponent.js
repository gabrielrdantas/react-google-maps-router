import * as React from 'react';
import * as scriptjs from 'scriptjs';

export default class GoogleMapsComponent extends React.Component {

    divMap;
    divDirectionsPanel;
    directionsDisplay;

    componentDidMount() {
        scriptjs('https:/maps.googleapis.com/maps/api/js?key=AIzaSyCRoz4R2eFrko_kqw0IaMy9uviycl4-BuI&sensor=false',
        () => {
            this.createMap();
            this.calculateRoute(); 
        });
    }

    createMap() {
        
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        let currentLatLong = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);

        let options = {
            zoom: 13,
            center: currentLatLong,
            mapTypeControl: true,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };

        let map = new window.google.maps.Map(this.divMap, options);
        this.directionsDisplay.setMap(map);
        this.directionsDisplay.setPanel(this.divDirectionsPanel)

    }
    
    calculateRoute() {
        let directionsService = new window.google.maps.DirectionsService();
        let start = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);
        let end =  new window.google.maps.LatLng(this.props.destinationLatitude, this.props.destinationLongitude);

        let request = {
            origin: start,
            destination: end,
            travelMode: window.google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
            }
        });

    }

    render() {
        //CHANGE AND PUT YOUR STYLES
        let style = {
            width: window.innerWidth - 25,
            height: window.innerHeight / 2 - 25
        }
        return (
            <div>
                <div 
                    style={style} 
                    ref={divMap =>  this.divMap = divMap}></div>
                <div 
                    style={style} 
                    ref={divDirectionsPanel => this.divDirectionsPanel = divDirectionsPanel}></div>
            </div>
        );
    }
}