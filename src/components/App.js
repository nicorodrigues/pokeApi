import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './Pokemon'

class App extends Component {

    constructor() {
        super();
        this.state = {
            idPokemon: 0
        }
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
                <input type="text" onBlur={evento => this.setPokemon(evento)} />

                <Pokemon idPokemon={this.state.idPokemon} />
            </div>
        );
    }
}

export default App;
