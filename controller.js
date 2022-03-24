/**
    controller.js
    09.03.2017
    Functional style
*/

const canvas = document.getElementById("canvas");
const w = canvas.width, h = canvas.height;
const environment = new Environment(
    w, h, canvas.getContext("2d")
);
const scoreLabel = document.getElementById("score");

const game_obj = new Game([ [w / 2, h / 2] ], 
                          directions.right, 
                          createFood(w, h, 8),
                          environment,
                          scoreLabel);        
game_obj.start(game);
game_obj.pause();

window.onkeydown = (e) => {
    
    if (game_obj.running)
        switch (e.key) {
        case 'ArrowLeft': game_obj.dir = turnLeft(game_obj.dir);
            break;
        case 'ArrowRight': game_obj.dir = turnRight(game_obj.dir);
            break;
        case ' ': game_obj.pause();
        }
    else
        if (e.key === ' ') game_obj.start(game);
};
