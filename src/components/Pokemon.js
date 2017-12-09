import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Datos from './Datos'

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: 0,
            id: '',
            pokemon: ''
        };
    }

    fetchData = () => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        axios.get(`${proxy}http://pokeapi.co/api/v2/pokemon/${this.props.idPokemon}`)
        .then(function(datos) {
            const pokemon = datos.data;

            this.setState({
                pokemon: pokemon,
                id: this.props.idPokemon,
                loaded: 1
            });

        }.bind(this))
        .catch(error => console.log(error))
    }


    render() {
        if (this.props.idPokemon === this.state.id) {
            if (this.state.loaded === 1) {
                return <Datos pokemon={this.state.pokemon}  />
            }
        } else {
            if (this.props.idPokemon !== 0) {
                this.fetchData();
                return <p>Cargando...</p>;
            }
            return false
        }
    }
}

export default Pokemon
