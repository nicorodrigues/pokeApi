import React, { Component } from 'react';

class NumPad extends Component {

    render() {
        return (
            <div id="numPad">
                <div id="num0" className="numPadNum" onClick={this.props.handleNumPad}>0</div>
                <div id="num1" className="numPadNum" onClick={this.props.handleNumPad}>1</div>
                <div id="num2" className="numPadNum" onClick={this.props.handleNumPad}>2</div>
                <div id="num3" className="numPadNum" onClick={this.props.handleNumPad}>3</div>
                <div id="num4" className="numPadNum" onClick={this.props.handleNumPad}>4</div>
                <div id="num5" className="numPadNum" onClick={this.props.handleNumPad}>5</div>
                <div id="num6" className="numPadNum" onClick={this.props.handleNumPad}>6</div>
                <div id="num7" className="numPadNum" onClick={this.props.handleNumPad}>7</div>
                <div id="num8" className="numPadNum" onClick={this.props.handleNumPad}>8</div>
                <div id="num9" className="numPadNum" onClick={this.props.handleNumPad}>9</div>
                <div id="numPadBotones">
                    <div id="numBuscar" onClick={this.props.search}>Buscar</div>
                    <div id="numBorrar" onClick={this.props.lastOneOut}>Borrar</div>
                </div>
            </div>
        )
    }
}

export default NumPad
