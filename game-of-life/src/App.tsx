import React, { useCallback, useState, useRef , useEffect} from 'react';
import produce from 'immer';


const numRows = 25
const numCols = 25

const operations = [
  [0,1],
  [0, -1],
  [1, 0],
  [1, -1],
  [1,1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
]

const color = {
  color : '	#000000'
}

const generateEmptyGrid = () => {

  const rows = [];
  for( let i = 0; i < numRows; i++){
    rows.push(Array.from(Array(numCols), () => 0 ))

    }  
    return rows

}




function App(){

  const [grid , setGrid] = useState( () => {

    return  generateEmptyGrid()
    })
  const [gen, setGen] = useState(0)  
  const [running , setRunning] = useState(false)
  const [colors , setColors] = useState(color.color)
  
  const runningRef = useRef(running);

   runningRef.current = running
  
  
  const runSimulation = useCallback(()=> {

  
    if (!runningRef.current){
      return ;
    }
    // simulate 
    setGrid( (g) => {
      return produce((g), gridCopy => {
        console.log('grid copy', g)
        for(let i = 0; i < numRows; i++){
          for(let k = 0; k< numCols; k++){
            let neighbors = 0
            operations.forEach(([x, y]) => {
              const newI = i+ x;
              const newK = k + y;
              if(newI >= 0 && newI < numRows && newK >= 0 && newK < numCols ){
                neighbors += g[newI][newK]
              }
            })

            if( neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;

            } else if(g[i][k]=== 0 && neighbors === 3){
              setGen(gen+1)
              gridCopy[i][k] = 1;
            }
    
          }
        }

      })

    })

    setTimeout(runSimulation, 1000);
    
  }, [])


  const generateGlider = () => {
  
    setGrid( (g) => {
      return produce((g), gridCopy => {
        console.log('grid copy', g)
        for(let i = 0; i < numRows; i++){
          for(let k = 0; k< numCols; k++){
            if( i === 1 && k === 1){
              gridCopy[i][k] = 1
            }else if( i === 2 && k === 2){
              gridCopy[i][k] = 1
            }else if( i === 3 && k === 2){
              gridCopy[i][k] = 1
            }else if( i === 2 && k === 3){
              gridCopy[i][k] = 1
            }else if( i === 1 && k === 3){
              gridCopy[i][k] = 1
            }else{
              gridCopy[i][k] = 0

            }
          }
        }
  
      })
  
    })
  
  
  }


  
  const generateToad = () => {
  
    setGrid( (g) => {
      return produce((g), gridCopy => {
        console.log('grid copy', g)
        for(let i = 0; i < numRows; i++){
          for(let k = 0; k< numCols; k++){
            if( i === 10 && k === 10){
              gridCopy[i][k] = 1
            }else if( i === 10 && k === 11){
              gridCopy[i][k] = 1
            }else if( i === 10 && k === 12){
              gridCopy[i][k] = 1
            }else if( i === 11 && k === 9 ){
              gridCopy[i][k] = 1
            }else if( i === 11 && k === 10){
              gridCopy[i][k] = 1
            }else if( i === 11 && k === 11){
              gridCopy[i][k] = 1
            }else{
              gridCopy[i][k] = 0

            }
          }
        }
  
      })
  
    })
  
  
  }

  const generatePentadecathlon = () => {
  
    setGrid( (g) => {
      return produce((g), gridCopy => {
        console.log('grid copy', g)
        for(let i = 0; i < numRows; i++){
          for(let k = 0; k< numCols; k++){
            if( i === 10 && k === 10){
              gridCopy[i][k] = 1
            }else if( i === 11 && k === 10){
              gridCopy[i][k] = 1
            }else if( i === 12 && k === 9){
              gridCopy[i][k] = 1
            }else if( i === 12 && k === 11 ){
              gridCopy[i][k] = 1
            }else if( i === 13 && k === 10){
              gridCopy[i][k] = 1
            }else if( i === 14 && k === 10){
            gridCopy[i][k] = 1
          }else if( i === 15 && k === 10){
            gridCopy[i][k] = 1
          }else if( i === 16 && k === 9){
            gridCopy[i][k] = 1
          }else if( i === 16 && k === 11){
            gridCopy[i][k] = 1
          }else if( i === 17 && k === 10){
            gridCopy[i][k] = 1
          }else if( i === 18 && k === 10){
            gridCopy[i][k] = 1
          }else{
              gridCopy[i][k] = 0

            }
          }
        }
  
      })
  
    })
  
  
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  console.log(getRandomColor())

     

  return (

    <>
      <button onClick={() => {
        setRunning(!running)
        runningRef.current = true
        runSimulation()
      }}> {running? "stop": "start" }</button>

    
      <button onClick={() => {
        setColors('#000000')
        setGen(0)
        setGrid(generateEmptyGrid)

      }}> Clear</button>

      <button 
      onClick={() => {
        setColors(getRandomColor())
      }}>
        Random Color 
      </button>

      <button onClick={() => {
         const rows = [];
         for( let i = 0; i < numRows; i++){
           rows.push(Array.from(Array(numCols), () => Math.random() > .7 ? 1: 0))
       
           }  
           setGrid(rows)
       
      }}> Random </button>

      <button onClick={() =>{
        generateGlider()
      }}>Glider</button>

      <button onClick={() =>{
        generateToad()
      }}>Toad</button>


      <button onClick={() =>{
        generatePentadecathlon()
      }}>Pentadecathlon</button>


    <div> Generation : {gen}</div>


    

      <div style={{
        display:'inline-grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}> {grid.map((rows, i) => 
              rows.map((col , k ) => 
              <div
              onClick={ () => {
                if(!running){
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ?  0 : 1;
                    })
                      setGrid(newGrid)
                  }}}
                  key={`${i}-${k}`}
                  style={{width:20, height: 20,
                  backgroundColor: grid[i][k] ? `${colors}` : undefined, 
                  border: "solid 1px black",
                  borderRadius: '0px' }}   />))} 
          </div>
    </>
    )
  
}

export default App;
