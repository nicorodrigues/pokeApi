import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon'
import axios from 'axios'

class App extends Component {

    constructor() {
        super();
        this.state = {
            pokemon: '',
            idPokemon: 0,
            loaded: 0
        }
    }

    fetchData = () => {
        this.setState({
            loaded: 1,
        })
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://pokeapi.co/api/v2/pokemon/';


        axios.get(proxy + url + this.state.idPokemon)
        .then(function(datos) {
            const pokemon = datos.data;

            this.setState({
                pokemon: pokemon,
                loaded: 2,
            });

        }.bind(this))
        .catch(error => console.log(error))
    }

    setPokemon(evento) {
        if (this.state.idPokemon !== evento.target.value) {
            this.setState({
                idPokemon: evento.target.value
            });
        }
    }

    render() {
        return (
            <div className="App">
                <input type="text" onChange={evento => this.setPokemon(evento)} />
                <button type="button" onClick={this.fetchData}>Buscar</button>

                {this.state.loaded !== 0 ? <Pokemon loaded={this.state.loaded} pokemon={this.state.pokemon} /> : ""}

            </div>
        );
    }
}

export default App;
