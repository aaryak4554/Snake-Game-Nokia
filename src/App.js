import "./App.css"

function App() {

    let gridSize = 25;
    function renderGrid(){
        let cellArray = [];
        for(let row=0;row<gridSize;row++){
            for(let col=0;col<gridSize;col++){
                let className = "grid-item";
                let cell = <div className={className} key={'${row}-${col}'}></div>
                cellArray.push(cell);
            }
        }
        return cellArray;
    }
  return (
    <div className="grid-container">
        <h1>snake game</h1>
        <button>start game</button>
        <div>score:<span>30</span></div>
        <div className="grid">{renderGrid()}</div>
    </div>
  );
}

export default App;
