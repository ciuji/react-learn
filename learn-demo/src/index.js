import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PropsTypes from "prop-types";



function Square(prop) {

    return (
        <button className="square"
            onClick={prop.onClick}
        >
            {prop.value}
        </button>
    );
}

function calculatewinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squres: Array(9).fill(null),
            xIsNext: true,
        };
    }
    renderSquare(i) {
        return <Square
            value={this.state.squres[i]}
            onClick={() => this.handleClick(i)}
        />;

    }
    handleClick(i) {
        const squres = this.state.squres.slice();
        if (calculatewinner(squres) || squres[i]) {
            return;
        }
        squres[i] = this.state.xIsNext ? "x" : "o";
        this.setState({
            squres: squres,
            xIsNext: !this.state.xIsNext,
        });
    }
    reset() {
        return <button
            onClick={() => {
                this.setState({
                    squres: Array(9).fill(null),
                    xIsNext: true
                });
            }}
        >reset
        </button>;

    }

    render() {
        const winner = calculatewinner(this.state.squres);
        let status;
        if (winner) {
            status = "winner:" + winner;
        }
        else {
            status = "Next Player " + (this.state.xIsNext ? "x" : "o");
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div ClassName="reset">{this.reset()}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);
