import React, { Component } from 'react';

class Buscador extends Component {
    render() {
        const { busqueda, idPokemon } = this.props;

        if (typeof busqueda === 'string' && busqueda !== '') {
            return (
                <div className="numero">
                    <p>Nombre</p>
                    <p className="buscador">{ busqueda }</p>
                </div>
            )
        }

        return (
            <div className="numero">
                <p>Número</p>
                <p className="buscador">{ idPokemon }</p>
            </div>
        )
    }
}

export default Buscador;
