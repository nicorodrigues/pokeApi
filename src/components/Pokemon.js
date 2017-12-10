import React, { Component } from 'react';
import axios from 'axios'
import Datos from './Datos'

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: 0,
            id: '',
            pokemon: '',
            limit: 949
        };
    }

    fetchData = () => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://pokeapi.co/api/v2/pokemon/';

        axios.get(proxy + url + this.props.idPokemon)
        .then(function(datos) {
            const pokemon = datos.data;

            this.setState({
                pokemon: pokemon,
                id: this.props.idPokemon,
                loaded: 1,
            });

        }.bind(this))
        .catch(error => console.log(error))
    }


    render() {
        const id = this.props.idPokemon;

        if (id === this.state.id) {
            if (this.state.loaded === 1) {
                return <Datos pokemon={this.state.pokemon}  />
            }
        } else {
            if (id !== 0 && id !== '' && id <= this.state.limit) {
                this.fetchData();
                return <p>Cargando...</p>;
            }
            return false
        }
    }
}

export default Pokemon
