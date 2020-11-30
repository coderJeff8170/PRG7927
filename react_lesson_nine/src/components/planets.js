import React from 'react';

import axios from 'axios';
import { ReactComponent } from '*.svg';

class Planets extends ReactComponent {
    state = {
        planetData: []
    }

    fetchPlanetData = () => {
        let encodedURI = window.encodeURI(this.props.uri);

        axios.get(encodedURI).then(response => {
            this.setState(() => {
                planetData: response.data
            });
        })
    }

    componentDidMount(){
        this.fetchPlanetData();
    }

    render(){
        console.log(this.state.planetData);

        if(this.state.planetData.length === 0){
            return (<div>failed to fetch data from server!</div>)
        }
        const planets = this.state.planetData.map(planet => (
            <div key={planet.name}>
                <em>{planet.name}</em>: {planet.numberOfMoons}
            </div>
        ));
        return (<div>{planets}</div>);
    }
}

export default Planets;