const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;

document.addEventListener("keydown", (e)=>{

    if(e.key=="ArrowUp") y-=10;
    if(e.key=="ArrowDown") y+=10;
    if(e.key=="ArrowLeft") x-=10;
    if(e.key=="ArrowRight") x+=10;

});

function game(){

    ctx.clearRect(0,0,800,500);

    // chão
    ctx.fillStyle="green";
    ctx.fillRect(0,0,800,500);

    // herói
    ctx.fillStyle="blue";
    ctx.fillRect(x,y,40,40);

    requestAnimationFrame(game);
}

game();