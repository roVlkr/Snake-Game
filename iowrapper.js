/**
    iowrapper.js
    17.03.2017
    Object-oriented style
*/

class Game {
    constructor(snake, dir, food, environment, scoreLabel) {
        this.snake = snake;
        this.dir = dir;
        this.environment = environment;
        this.food = food;
        this.scoreLabel = scoreLabel;
        
        this.running = false;
    }
    
    start(fkt) {
        const time = 200; // ms
        
        const run = () => {
            const oldLength = this.snake.length;
            
            const vars = fkt(this.snake, this.dir, this.food, this.environment);
            if (vars === null) this.pause();
            else [this.snake, this.dir, this.food, this.environment] = vars;
            
            const newLength = this.snake.length;
            if (newLength != oldLength)
                scoreLabel.innerHTML = "Length: " + this.snake.length;
        };
        
        run();
        this.running = true;
        this.interval = setInterval(run, time);
    }
    
    pause() {
        this.running = false;
        clearInterval(this.interval);
    }
}
