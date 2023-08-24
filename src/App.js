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
    const [dir, setDir] = useState([0,1]);
    const [speed, setSpeed] = useState(500);
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDir([0,1]);
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

    }

    const checkCollision = (head, snk = snake) => {
        //boundary collision
        if( 
            head[0]*SCALE >= CANVAS_SIZE[0] || 
            head[0] < 0 || 
            head[1]*SCALE >= CANVAS_SIZE[1] || 
            head[1] < 0
        ) return true;
        return false;
    }

    const eatFood = () => {

    }

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if(checkCollision(newSnakeHead)===true) endGame();
        snakeCopy.pop();
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

    useInterval(() => gameLoop(), speed);
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
