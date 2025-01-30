import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Chess } from 'chess.js';  // ES Module style if supported by your version


import  Board  from './components/Board';

const App = () => {
  const [game, setGame] = useState(new Chess()); // Create a new chess game
  const [board, setBoard] = useState(game.board()); // Set the board layout

  // Update board whenever the game state changes
  useEffect(() => {
    setBoard(game.board());
  }, [game]);

  const handleSquarePress = (from: string, to: string) => {
    const newGame = new Chess(game.fen()); // Clone the current game state

    // Attempt to make the move
    const move = newGame.move({ from, to });
    if (move) {
      setGame(newGame); // Update game state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chess Game</Text>
      <Board board={board} onSquarePress={handleSquarePress} />
      <Text style={styles.status}>Status: {game.isGameOver() ? 'Game Over' : 'In Progress'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginTop:20,
  },
});

export default App;

