import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Status extends React.Component {
    render() {
        if (this.props.winner) {
            return (<h2>Winner is {this.props.winner}</h2>)
        } else {
            return (this.props.xIsNext ? <h2>Next player is X</h2> : <h2>Next player is O</h2>)
   		 }
	}
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array(9).fill(null),
      xIsNext: true,
      winner: null
    }
  }

  checkEnd() {
    let winLines =
       [["0", "1", '2'],
        ["3", "4", '5'],
        ["6", "7", '8'],
        ["0", "3", '6'],
        ["1", "4", '7'],
        ["2", "5", '8'],
        ["0", "4", '8'],
        ["2", "4", '6']];

    for (let index = 0; index < winLines.length; index++) {
      const [a, b, c] = winLines[index];
      let board = this.state.board;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({
          winner: board[a]
        })
        alert(board[a] + ' is won');
        this.reset();
      }
    }
    let count = 0;
    this.state.board.forEach(function (value) {
        if (value !== null) {
            count++;
        }
    })
    let isFull;
    if (count === 9) {
        isFull = true;
    }
    if (isFull && !this.state.winner) {
        alert('Tie');
        this.reset();
    }
  }

    handleClick(index) {
        if (!this.state.winner) {
            let newBoard = this.state.board;
            if (this.state.board[index] === null) {
                newBoard[index] = this.state.xIsNext ? "X" : "O";
                this.setState({
                    board: newBoard,
                    xIsNext: this.state.xIsNext ? false : true
                })
            this.checkEnd()
        }
    }
  }

  renderCells() {
    return this.state.board.map(
      (cell, index) =>
        <div className="cell" key={index}
          onClick={() => this.handleClick(index)}>
          {cell} </div>
    )
  }

  reset() {
    this.setState({
      xIsNext: true,
      winner: null,
      board: Array(9).fill(null)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe App</h1>
        <Status
          xIsNext={this.state.xIsNext}
          winner={this.state.winner}
        />
        <div className="board">
          {this.renderCells()}
        </div>
        <button className="resetButton" onClick={() => this.reset()}> New Game</button >
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
