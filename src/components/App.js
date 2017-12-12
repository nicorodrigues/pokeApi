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
                loaded: 2,
            });

        }.bind(this))
        .catch(function(error) {
            this.setState({
                error: 1,
                loaded: 2
            });
            }.bind(this)
        )
    }

    setPokemon(evento) {
        if (this.state.idPokemon !== evento.target.value) {
            this.setState({
                idPokemon: evento.target.value
            });
        }
    }

    render() {
        const { limit } = this.state;
        const { idPokemon } = this.state;
        const { loaded } = this.state;
        const { pokemon } = this.state;
        const { error } = this.state;

        return (

            <div className="App">
                <input type="text" onChange={evento => this.setPokemon(evento)} />
                    <button type="button" onClick={this.fetchData}>Buscar</button>
                    {
                        loaded !== 0 ? <Pokemon error={error} loaded={loaded} pokemon={pokemon} /> : ""
                    }

                </div>
            );
        }
    }

    export default App;
