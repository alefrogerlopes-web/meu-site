const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Herói
let x = 100;
let y = 100;
let velocidade = 1.5;

// Monstro
let mobX = 500;
let mobY = 250;

function game() {

    ctx.clearRect(0, 0, 800, 500);

    // Chão
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 800, 500);

    // Movimento automático do herói
    if (x < mobX) x += velocidade;
    if (x > mobX) x -= velocidade;

    if (y < mobY) y += velocidade;
    if (y > mobY) y -= velocidade;

    // Mata o monstro e nasce outro em posição aleatória
    if (
        Math.abs(x - mobX) < 40 &&
        Math.abs(y - mobY) < 40
    ) {
        mobX = Math.random() * 700;
        mobY = Math.random() * 400;
    }

    // Desenha o monstro
    ctx.font = "40px Arial";
    ctx.fillText("👹", mobX, mobY + 35);

    // Desenha o herói
    ctx.fillText("🧙", x, y + 35);

    requestAnimationFrame(game);
}

game();