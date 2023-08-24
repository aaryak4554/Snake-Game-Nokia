import "./App.css";
import {useState, useEffect, useRef} from "react";
import {useInterval} from './useInterval';
import {
    CANVAS_SIZE,
    SNAKE_START,
    FOOD_START,
    SPEED,
    SCALE,
    DIRECTIONS
} from './constants'


function App() {

    const canvasRef = useRef(null);
    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [dir, setDir] = useState([0,-1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);


    useInterval(() => gameLoop(), speed);

    const startGame = () => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDir([0,-1]);
        setSpeed(SPEED);
        setGameOver(false);
    }

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
    }

    const moveSnake = ({keyCode}) => {
        keyCode>=37 && keyCode<=40 && setDir(DIRECTIONS[keyCode]);
    }
    const createFood = () => {
        food.map((_a,i) => Math.floor(Math.random()*(CANVAS_SIZE[i]/SCALE)));
    }

    const checkCollision = (head, snk = snake) => {
        //boundary collision
        if( 
            head[0]*SCALE >= CANVAS_SIZE[0] || 
            head[0] < 0 || 
            head[1]*SCALE >= CANVAS_SIZE[1] || 
            head[1] < 0
        ) return true;

        //snake tail collision
        for(const it of snk){
            if(head[0]===it[0] && head[1]===it[1]) return true;
        }
        return false;
    }   

    const eatFood = (newSnake) => {
        if(newSnake[0][0]===food[0] && newSnake[0][1]===food[1]){
            let newFood = createFood();
            while(checkCollision(newFood,newSnake)){
                newFood = createFood();
            }
            setFood(newFood);
            return true;
        }
        return false;
    }

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if(checkCollision(newSnakeHead)) endGame();
        if(!eatFood(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    }

    useEffect(()=>{
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
        context.fillStyle = "pink";
        snake.forEach(([x, y]) => context.fillRect(x,y,1,1));
        context.fillStyle = "lightblue";
        context.fillRect(food[0],food[1],1,1);
    }, [snake,food,gameOver]);

    return (
        <div 
            className="main"
            role="button"
            tabIndex="0"
            onKeyDown={e => moveSnake(e)}
        >
            <canvas
                ref={canvasRef}
                style={{border: "1px solid green"}}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
            <button onClick={startGame}>Start Game</button>
            {gameOver && <div>GAME OVER!</div>}
        </div>
    );
}

export default App;
