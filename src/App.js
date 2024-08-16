import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';

const Grid = () => {
  const gridSize = 5;
  const totalSquares = gridSize * gridSize;

  const [grid, setGrid] = useState(Array(totalSquares).fill('beige'));
  const [borderColor, setBorderColor] = useState('transparent');

  const randomizeColors = () => {
    let newGrid = Array(totalSquares).fill('beige');
    let indices = Array.from({ length: totalSquares }, (_, i) => i);
    
    // Shuffle indices to select random squares
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const blueIndices = indices.slice(0, 9);
    const redIndices = indices.slice(9, 18);

    blueIndices.forEach(index => {
      newGrid[index] = 'blue';
    });

    redIndices.forEach(index => {
      newGrid[index] = 'red';
    });

    // Choose a random square (either blue or red) to turn black
    const blackIndex = indices[Math.floor(Math.random() * 18)];
    let oldColor = newGrid[blackIndex]
    newGrid[blackIndex] = 'black';

    // Set border color opposite to the square turned black
    const newBorderColor = oldColor === 'blue' ? 'red' : 'blue';
    setBorderColor(newBorderColor);

    setGrid(newGrid);
  };

  return (
    <div>
      <img src={logo} className="logo"/>
      <div className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 50px)`,
          gridTemplateRows: `repeat(${gridSize}, 50px)`,
          gap: '5px',
          border: `5px solid ${borderColor}`,
        }}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: color,
            }}
          />
        ))}
      </div>
      <button className="newgame" onClick={() => randomizeColors()} style={{ marginTop: '20px' }}>
        Nyt Spil
      </button>
      <a className="rules" href="https://papmajor.dk/wp-content/uploads/codenames-rules-dk.pdf" target='_blank'>Codenames Regler</a>
    </div>
  );
};

export default Grid;