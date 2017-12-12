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
            limit: 802
        }
    }

    fetchData = () => {
        this.setState({
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
        const { limit } = this.state;
        const { idPokemon } = this.state;
        const { loaded } = this.state;
        const { pokemon } = this.state;

        return (

            <div className="App">
                <input type="text" onChange={evento => this.setPokemon(evento)} />
                {
                    limit >= idPokemon ?
                <button type="button" onClick={this.fetchData}>Buscar</button>
                 : <button type="button" >Buscar</button>}

                {
                    loaded !== 0 ? <Pokemon loaded={loaded} pokemon={pokemon} /> : ""
                }

            </div>
        );
    }
}

export default App;
