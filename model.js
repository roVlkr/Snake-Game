/**
    model.js
    09.03.2017
    Functional style
*/


/**
    This section is about abstracting the concepts
    of moving points around.
*/

const directions = {
    left: 0, up: 1, right: 2, down: 3
};

const turnDirection = turn => dir => {
    switch(turn) {
    case directions.left:  return (dir + 3) % 4; // 3 "=" (4) -1
    case directions.right: return (dir + 5) % 4; // 5 "=" (4) +1
    default:               return undefined;
    }
};

const turnLeft  = turnDirection(directions.left);
const turnRight = turnDirection(directions.right);

const moveBy = (dx, dy) => point => {
    return [
        point[0] + dx,
        point[1] + dy
    ];
};

const moveX         = dx => moveBy(dx, 0);
const moveY         = dy => moveBy(0, dy);
const movePointTo   = (point, dir, vel) => {
    switch(dir) {
    case directions.left:   return moveX(-vel)  (point);
    case directions.right:  return moveX(vel)   (point);
    case directions.up:     return moveY(-vel)  (point);
    case directions.down:   return moveY(vel)   (point);
    }
};


/**
    Now follows the more concrete section, such as
    the functions draw and game.
*/

const fieldSize = 16;

const createRandomCoordinates = (w, h) => {
    return [
        Math.floor(Math.random() * w / fieldSize) * fieldSize,
        Math.floor(Math.random() * h / fieldSize) * fieldSize
    ];
};

const createFood = (w, h, len) => {
    const addFood = (arr) => {
        if (arr.length < len) {
            arr.push(createRandomCoordinates(w, h));
            return addFood(arr);
        }

        return arr;
    };

    return addFood([]);
};

const draw = (snake, food, environment) => {
    const ctx = environment.ctx;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, environment.w, environment.h);
    
    ctx.fillStyle = "red";
    food.forEach(f => {
        ctx.beginPath();
        ctx.arc(f[0] + 8, f[1] + 8, (fieldSize - 4)/2, 0, 2*Math.PI, false);
        ctx.fill();
    });

    ctx.fillStyle = "black";
    snake.forEach(s => ctx.fillRect(s[0] + 1, s[1] + 1, fieldSize - 2, fieldSize - 2));
};

// Gathers all required information from the outside
function Environment (w, h, ctx) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;
}

const collision = (snake, env) => {
    if (head(snake)[0] < 0 || head(snake)[1] < 0 ||
        head(snake)[0] >= env.w || head(snake)[1] >= env.h)
        return true;
        
    const bite = (h, t) => {
        if (t.length === 0) return false;
        
        if ( equal(h, head(t)) )
            return true;
        else
            return bite(h, tail(t));
    };
    
    return bite(head(snake), tail(snake));
};

const game = (snake, dir, food, env) => {
    const notEaten = (food.length === 0) ? createFood(env.w, env.h, 8) :
        food.filter(f => !equal(f, head(snake)));        
    const eaten = food.length - notEaten.length; 
    
    const newSnake = snake.reduce((acc, s) => {
        if (acc.length < snake.length || eaten > 0)
            acc.push(s);
        
        return acc;
    }, [movePointTo(head(snake), dir, fieldSize)]);
    
    if (collision(newSnake, env)) // Spiel vorbei
        return null;
    
    draw(newSnake, notEaten, env);    
    return [newSnake, dir, notEaten, env];
};
