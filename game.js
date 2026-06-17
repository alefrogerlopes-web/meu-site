const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Herói
let x = 100;
let y = 100;
let velocidade = 1.5;

// Monstro
let mobX = 500;
let mobY = 250;
let mobVivo = true;

function game() {

    ctx.clearRect(0, 0, 800, 500);

    // chão
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 800, 500);

    // Movimento automático do herói
    if (mobVivo) {

        if (x < mobX) x += velocidade;
        if (x > mobX) x -= velocidade;

        if (y < mobY) y += velocidade;
        if (y > mobY) y -= velocidade;

        // ataque automático
        if (
            Math.abs(x - mobX) < 40 &&
            Math.abs(y - mobY) < 40
        ) {
            mobX = Math.random() * 700;
mobY = Math.random() * 400;
        }
    }

    // Desenha o monstro
    if (mobVivo) {
        ctx.fillStyle = "red";
        ctx.fillRect(mobX, mobY, 40, 40);
    }

    // Desenha o herói
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 40, 40);

    requestAnimationFrame(game);
}

game();