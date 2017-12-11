import React, { Component } from 'react';

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: this.props.pokemon,
            limit: 949
        };
    }

    render() {
        const pokemon = this.props.pokemon;

        if (this.props.loaded === 1) {
            return <p>Cargando...</p>
        }
        return (
            <div>
                <ul>
                    <li><img src={pokemon.sprites.front_default} alt={pokemon.name} /></li>
                    <li><h1>{pokemon.name}</h1></li>
                    <li>Número: {pokemon.id}</li>
                    {pokemon.stats.map(function(elem) {
                        return <li key={elem.stat.name}>{elem.stat.name}: {elem.base_stat}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Pokemon
