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
            loaded: 0,
            limit: 802,
            error: 0
        }
    }

    fetchData = () => {
        this.setState({
            error: 0,
            loaded: 1,
        })
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const proxy1 = 'https://cors.now.sh/'
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        const query = url + this.state.idPokemon;

        axios.get(query)
        .then(function(datos) {
            const pokemon = datos.data;
            this.setState({
                pokemon: pokemon,
                idPokemon: pokemon.id,
                loaded: 2,
            });

        }.bind(this))
        .catch(function(error) {
            this.setState({
                error: 1,
                loaded: 2
            });
        }.bind(this))
    }

    setPokemon(evento) {
        if (this.state.idPokemon !== evento.target.value) {
            this.setState({
                idPokemon: isNaN(evento.target.value) ? evento.target.value.toLowerCase() : evento.target.value
            });
        }
    }

    nextPokemon = () => {
        if (this.state.idPokemon < this.state.limit) {
            this.setState({
                idPokemon: isNaN(this.state.idPokemon) ? this.state.pokemon.id + 1 : this.state.idPokemon + 1
            }, function() {
                this.fetchData();
            }.bind(this));
        }
    }

    prevPokemon = () => {
        if (this.state.idPokemon > 0) {
            this.setState({
                idPokemon: isNaN(this.state.idPokemon) ? this.state.pokemon.id - 1 : this.state.idPokemon - 1
            }, function() {
                this.fetchData();
            }.bind(this));
        }
    }

    render() {
        const { limit } = this.state;
        const { loaded } = this.state;
        const { pokemon } = this.state;
        const { error } = this.state;

        return (

            <div className="App">
                <input type="text" onChange={evento => this.setPokemon(evento)} />
                <button type="button" onClick={this.fetchData}>Buscar</button>
                <div className="pokedex">
                    <img src="./pokedex.jpg" alt="test" />
                    <div id="next" onClick={this.nextPokemon}></div>
                    <div id="prev" onClick={this.prevPokemon}></div>

                    {
                        loaded !== 0 ? <Pokemon error={error} loaded={loaded} pokemon={pokemon} /> : ""
                    }
                </div>
            </div>
        );
    }
}

export default App;
