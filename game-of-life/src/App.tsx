import React, { useCallback, useState, useRef } from 'react';
import produce from 'immer';
import {Contaier, Heading, ButtonContainer, GenCounter, GifContainer, RulesContainer, PresetContainer, Background, GridContainer, List,  ExtraGifContainer} from './styles/styles'
import glider from './glider.gif'
import column from './column.gif'
import toad from './toad.gif'
import './App.scss';


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
  const [colors , setColors] = useState('#000000')
  
  const runningRef = useRef(running);

   runningRef.current = running

  const genRef = useRef(gen);
  genRef.current = gen
  
  
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
              gridCopy[i][k] = 1;
            }
    
          }
        }

      })

    })
    setGen(genRef.current + 1);
    setTimeout(runSimulation, 1000);
    
  }, []);


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
    <Background>
     <div className="head" >
     <p> Conway's Game of Life </p>
    </div> 
    <Contaier>
    <div>
      <RulesContainer>
      <Heading>Rules</Heading>
      <ul>
        <List>Any live cell with two or three live neighbours survives.</List>
        <List>Any dead cell with three live neighbours becomes a live cell.</List>
        <List>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</List>
      </ul>
      </RulesContainer>

      <Heading> Preset Designs </Heading>

      <PresetContainer>

      

        <GifContainer>

          <img src={glider} alt="thumbnail"/>
        </GifContainer>
        <GifContainer>
      

          <button className="btn cta bg"  onClick={() =>{
            generateGlider()
          }}>Glider</button>

        </GifContainer>
        
        <GifContainer>

        <img src={toad} alt="thumbnail"/>
        </GifContainer>
        <GifContainer>

          <button className="btn cta bg" onClick={() =>{
            generateToad()
          }}>Toad</button>

        </GifContainer>

        </PresetContainer>
        <PresetContainer>
        <ExtraGifContainer>

        <img src={column} alt="thumbnail"/>



          <button className="btn cta bg" onClick={() =>{
            generatePentadecathlon()
          }}>Pentadecathlon</button>
        </ExtraGifContainer>
        </PresetContainer>


    </div>
      <div>
        
        <GenCounter> <Heading> Generation : {gen} </Heading>  </GenCounter>
      <div>

      <GridContainer style={{
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
          </GridContainer>
          <ButtonContainer>
          <button className="btn cta bg" onClick={() => {
            setRunning(!running)
            runningRef.current = true
            runSimulation()
          }}> {running? "stop": "start" }</button>

        
          <button  className="btn cta bg" onClick={() => {
            setColors('#000000')
            setGen(0)
            setGrid(generateEmptyGrid)

          }}> Clear</button>
          </ButtonContainer>
          <ButtonContainer>
          <button className="btn cta bg" onClick={() => {
            const rows = [];
            for( let i = 0; i < numRows; i++){
              rows.push(Array.from(Array(numCols), () => Math.random() > .7 ? 1: 0))
          
              }  
              setGrid(rows)
          
          }}> Random Grid </button>

            <button className="btn cta bg " 
            onClick={() => {
              setColors(getRandomColor())
            }}>
              Random Color 
            </button>
          </ButtonContainer>

          </div>

          </div>
        </Contaier>




    

      </Background>
    )
  
}

export default App;
