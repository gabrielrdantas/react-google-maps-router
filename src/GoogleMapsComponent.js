import * as React from 'react';
import * as scriptjs from 'scriptjs';

export default class GoogleMapsComponent extends React.Component {

    divMap;
    divDirectionsPanel;
    directionsDisplay;

    componentDidMount() {
        scriptjs('https:/maps.googleapis.com/maps/api/js?key=YOUR_KEY&sensor=false',
        () => {
            this.createMap();    
        });
    }

    createMap() {
        
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        let latLongUser = new window.google.maps.LatLng(-22.969352, -43.427475);

        let options = {
            zoom: 13,
            center: latLongUser,
            mapTypeControl: true,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };

        let map = new window.google.maps.Map(this.divMap, options);
        this.directionsDisplay.setMap(map);
        this.directionsDisplay.setPanel(this.divDirectionsPanel)

        this.calculateRoute();
    }
    
    calculateRoute() {
        let directionsService = new window.google.maps.DirectionsService();
        let start = new window.google.maps.LatLng(-22.923049, -43.373979);
        let end =  new window.google.maps.LatLng(-22.997345, -43.358052);

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
        let style = {
            width: window.innerWidth,
            height: '500px'
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