import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import axios from 'axios';
import Pad from './Pad';
import NumPad from './NumPad';

class App extends Component {

    constructor() {
        super();
        this.state = {
            pokemon: '',
            idPokemon: 0,
            loaded: 0,
            limit: 802,
            error: 0,
            togglePhoto: false
        }
    }

    fetchData = () => {
        this.fotitoArranca();
        this.setState({
            error: 0,
            loaded: 1,
        })
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const proxy1 = 'https://cors.now.sh/'
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

            this.fotitoTermina();
        }.bind(this))
        .catch(function(error) {
            this.setState({
                error: 1,
                loaded: 2
            });
            this.fotitoTermina();
        }.bind(this))
    }

    setPokemon(evento) {
        if (this.state.idPokemon !== evento.target.value) {
            this.setState({
                idPokemon: isNaN(evento.target.value) ? evento.target.value.toLowerCase() : evento.target.value
            });
        }
    }

    fotitoArranca = () => {
        if (this.fotito) {
            this.fotitoTermina();
        }
        const foto = document.querySelector('#fotito');

        this.fotito = setInterval(function() {
                if (foto.style.display === "block") {
                    foto.style.display = 'none';
                } else {
                    foto.style.display = 'block';
                }
            }, 300)
    }

    fotitoTermina = () => {
        const foto = document.querySelector('#fotito');
        clearInterval(this.fotito);
        foto.style.display = 'none';
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
        const {idPokemon} = this.state;

        if (idPokemon > 1) {
            this.setState({
                idPokemon: isNaN(idPokemon) ? this.state.pokemon.id - 1 : idPokemon - 1
            }, function() {
                this.fetchData();
            }.bind(this));
        }
    }

    togglePhotoSize = () => {
        this.state.togglePhoto === false ? this.setState({togglePhoto: true}) : this.setState({togglePhoto: false})
    }

    handleNumPad = (event) => {
        const newNumber = this.state.idPokemon + `${event.currentTarget.textContent}`;

        if (this.state.idPokemon == 0) {
            this.setState({
                idPokemon: Number(event.currentTarget.textContent)
            })
        } else if (newNumber >= this.state.limit) {
            this.setState({
                idPokemon: this.state.limit
            })
        } else {
            this.setState({
                idPokemon: Number(newNumber)
            })
        }
    }

    lastOneOut = () => {
        const idPokemon = String(this.state.idPokemon);

        if (idPokemon.length !== 1) {
            console.log(idPokemon.length);
            this.setState({
                idPokemon: Number(String(this.state.idPokemon).substring(0, idPokemon.length - 1))
            })
        } else {
            this.setState({
                idPokemon: 0
            })
        }
    }

    render() {
        const { loaded, pokemon, error, togglePhoto } = this.state;


        return (

            <div className="App">
                <input type="text" onChange={evento => this.setPokemon(evento)} />
                <button type="button" onClick={this.fetchData}>Buscar</button>
                <div className="pokedex">
                    <img id="fotito" src="./fotito.png" alt="fotito" />
                    <img src="./pokedex.jpg" alt="test" />
                    <Pad nextPokemon={this.nextPokemon} prevPokemon={this.prevPokemon} togglePhoto={this.togglePhotoSize} />
                    {
                        loaded !== 0 ? <Pokemon togglePhoto={togglePhoto} ref="pokemon" error={error} loaded={loaded} idPokemon={this.state.idPokemon} pokemon={pokemon} /> : ""
                    }
                    <NumPad handleNumPad={this.handleNumPad} lastOneOut={this.lastOneOut} search={this.fetchData} />
                    <p className="numero">Número: {this.state.idPokemon}</p>
                </div>
            </div>
        );
    }
}

export default App;
