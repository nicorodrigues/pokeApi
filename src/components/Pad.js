import React, { Component } from 'react';

class Pad extends Component {
    render() {
        return (
            <div>
                <div id="togglePhotoSize" onClick={this.props.togglePhoto}></div>
                <div id="next" onClick={this.props.nextPokemon}></div>
                <div id="prev" onClick={this.props.prevPokemon}></div>
            </div>
        )
    }

}

export default Pad
