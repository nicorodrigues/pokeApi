import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import axios from 'axios';
import Pad from './Pad';
import NumPad from './NumPad';
import Buscador from './Buscador';

class App extends Component {

    constructor() {
        super();
        this.state = {
            pokemon: '',
            idPokemon: 0,
            loaded: 0,
            limit: 802,
            error: 0,
            togglePhoto: false,
            busqueda: ''
        }
        document.addEventListener('keydown', this.handleKeyPress);
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
                busqueda: '',
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
        if (evento.type) {
            if (this.state.idPokemon !== evento.target.value) {
                this.setState({
                    idPokemon: isNaN(evento.target.value) ? evento.target.value.toLowerCase() : Number(evento.target.value)
                });
            }
        } else {
            if (this.state.idPokemon !== evento) {
                this.setState({
                    idPokemon: isNaN(evento) ? evento.toLowerCase() : Number(evento)
                });
            }
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

    handleLetters = (key) => {
        let newLetter;
        const id = this.state.idPokemon;

        if (typeof id === 'number' || id === 0) {
            newLetter = key;
        } else {
            newLetter = id + key;
        }

        this.setState({
            idPokemon: newLetter,
            busqueda: newLetter
        })
    }

    handleNumPad = (key) => {
        let newNumber = '';

        if (key.type) {
            newNumber = this.state.idPokemon + `${key.currentTarget.textContent}`;
        } else {
            newNumber = this.state.idPokemon + key;
        }

        if (typeof this.state.idPokemon === 'string') {
            this.setState({
                idPokemon: 0,
                busqueda: ''
            })
        }


        if (this.state.idPokemon == 0) {
            this.setState({
                idPokemon: (key.type) ? Number(key.currentTarget.textContent) : Number(key)
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
        const newId = idPokemon.substring(0, idPokemon.length - 1);

        if (idPokemon.length !== 1) {

            if (typeof this.state.idPokemon === 'string') {
                this.setState({
                    idPokemon: newId,
                    busqueda: newId
                })
            } else {
                this.setState({
                    idPokemon: Number(newId),
                })
            }
        } else {
            if (typeof this.state.idPokemon === 'string') {
                this.setState({
                    idPokemon: 0,
                    busqueda: ''
                })
            } else {
                this.setState({
                    idPokemon: 0,
                })
            }
        }
    }

    reset = () => {
        this.setState({
            idPokemon: 0,
            busqueda: ''
        })
    }

    handleKeyPress = (keypress) => {
        const nums = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        const erase = [8, 27, 127];
        const enter = 13;
        const arrowLeft = 37;
        const arrowRight = 39;
        const letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        // const arrowUp = 38;
        // const arrowDown = 40;


        const code = keypress.keyCode;
        const key = keypress.key;

        if (nums.indexOf(code) !== -1) {
            this.handleNumPad(key)
        } else if (erase.indexOf(code) !== -1) {
            this.lastOneOut();
        } else if (code === enter) {
            this.fetchData();
        } else if (code === arrowLeft) {
            this.prevPokemon();
        } else if (code === arrowRight) {
            this.nextPokemon();
        } else if (letras.indexOf(key) !== -1) {
            this.handleLetters(key);
        }
    }

    randomPokemon = () => {
        const min = 0;
        const max = this.state.limit;
        let id;

        if(min == 0){
            id = Math.floor((Math.random() * max) + 0);
        }else{
            id = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.setState({
            idPokemon: id,
            busqueda: ''
        }, this.fetchData)
    }

    render() {
        const { loaded, pokemon, error, togglePhoto } = this.state;


        return (

            <div className="App">
                {/* <input type="text" onChange={evento => this.setPokemon(evento)} /> */}
                {/* <button type="button" onClick={this.fetchData}>Buscar</button> */}
                <div className="pokedex">
                    <img id="fotito" src="./fotito.png" alt="fotito" />
                    <img src="./pokedex.jpg" alt="test" />
                    <Pad nextPokemon={loaded === 1 ? '' : this.nextPokemon} prevPokemon={loaded === 1 ? '' : this.prevPokemon} togglePhoto={loaded === 1 ? '' : this.togglePhotoSize} reset={this.reset} random={loaded === 1 ? '' : this.randomPokemon}/>
                    {
                        loaded !== 0 ? <Pokemon togglePhoto={togglePhoto} ref="pokemon" error={error} loaded={loaded} idPokemon={this.state.idPokemon} pokemon={pokemon} /> : ""
                    }
                    <NumPad handleNumPad={this.handleNumPad} lastOneOut={this.lastOneOut} search={loaded === 1 ? '' : this.fetchData} reset={this.reset}/>

                    <Buscador busqueda={this.state.busqueda} idPokemon={this.state.idPokemon} />
                </div>
            </div>
        );
    }
}

export default App;
