import React, { Component } from 'react';

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: this.props.pokemon,
        };
    }

    render() {
        const pokemon = this.props.pokemon;

        if (this.props.loaded === 1) {
            return <p className="foto">Cargando...</p>;
        }
        if (this.props.error === 1) {
            return (
                <div>
                    <img src='/notFound.gif' alt='not found' className="foto notFound" />
                    <p className="notFoundText">El Pokémon no existe...</p>
                </div>
            )
        }
        return (
            <div>
                <ul>
                    <li><img src={pokemon.sprites.front_default} alt={pokemon.name} className={this.props.togglePhoto ? "fotoGrande foto" : "foto"} /></li>
                    <li className={this.props.togglePhoto ? "hidden nombre" : "nombre"}><h1>{pokemon.name}</h1></li>
                    <div className="datos">
                        {pokemon.stats.map(function(elem) {
                            return <li key={elem.stat.name}>{elem.stat.name}: {elem.base_stat}</li>
                        })}
                    </div>
                </ul>
            </div>
        )
    }
}

export default Pokemon
