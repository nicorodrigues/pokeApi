import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Datos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pokemon = this.props.pokemon;

        return (
            <div>
                <ul>
                    <li>ID: {pokemon.id}</li>
                    <li>Nombre: {pokemon.name}</li>
                </ul>
            </div>
        )
    }
}
export default Datos
