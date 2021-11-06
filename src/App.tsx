import React from 'react';
import './App.css';
import Grid from './Grid';
import * as types from './types';

const initalCells: types.Cells = []
const rows = 24
const cols = 15
while (initalCells.length < rows) {
  const row = []
  while (row.length < cols) {
    row.push({
      x: row.length,
      y: initalCells.length,
      value: undefined,
    })
  }
  initalCells.push(row)
}

// get a copy of the grid, all empty cells
const clearGrid = (grid: types.Cells): types.Cells => {
  return grid.map((row): types.Cell[] => {
    return row.map((r): types.Cell => {
      return {
        ...r,
        value: undefined,
      }
    })
  })
}

const initialAmanda: types.Actor = {
  value: 'amanda',
  x: 0,
  y: 0,
  mx: 0,
  my: 0,
}

const App: React.FC = () => {
  const [cells, setCells] = React.useState<types.Cells>(initalCells)
  const [actors, setActors] = React.useState<types.Actor[]>([initialAmanda])

  React.useEffect(() => {
    const nextCells: types.Cells = clearGrid(cells)
    actors.forEach((actor) => {
      nextCells[actor.y][actor.x].value = actor.value
    })
    setCells(nextCells)
  }, [actors])

  const handleDown = React.useCallback(() => {
    const amanda = actors[0]
    const bottom = cells.length
    const canMove = amanda.y + 1 < bottom
    if (!canMove) {
      console.log('dang')
    } else {
      amanda.y = amanda.y + 1
      setActors([
        amanda,
      ])
    }
  }, [actors])

  const handleRight = React.useCallback(() => {
    const amanda = actors[0]
    const right = cells[0].length
    const canMove = amanda.x + 1 < right
    if (canMove) {
      amanda.x = amanda.x + 1
      setActors([
        amanda,
      ])
    }
  }, [actors])

  const handleLeft = React.useCallback(() => {
    const amanda = actors[0]
    const left = 0
    const canMove = amanda.x - 1 >= left
    if (canMove) {
      amanda.x = amanda.x - 1
      setActors([
        amanda,
      ])
    }
  }, [actors])

  const keydownHandler = React.useCallback((event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          handleDown()
          break
        case 'ArrowRight':
          handleRight()
          break
        case 'ArrowLeft':
          handleLeft()
          break
        default:
      }
    }, [handleDown, handleLeft, handleRight])

  React.useEffect(() => {
    // only responsible for adding/removing handler
    window.addEventListener('keydown', keydownHandler)
    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])

  return (
    <div className="App">
      <Grid cells={cells} />
    </div>
  );
}

export default App;
