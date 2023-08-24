const CANVAS_SIZE = [500, 500];

const SNAKE_START = [
    [2,3], //coordinates
    [2,4]
];

const FOOD_START = [6, 7];

const SPEED = 100;

const SCALE = 20;

const DIRECTIONS ={ 
    37: [-1, 0], //left
    38: [0, -1], //up
    39: [1, 0],  //right
    40: [0, 1] //down
};

export{
    CANVAS_SIZE,
    SNAKE_START,
    FOOD_START,
    SPEED,
    SCALE,
    DIRECTIONS
};