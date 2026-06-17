const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Heroína
let x = 100;
let y = 100;
let velocidade = 1.5;

// Monstro
let mobX = 500;
let mobY = 250;

// Carrega as imagens
const paladina = new Image();
paladina.src = "paladina.png";

const monstro = new Image();
monstro.src = "monstro.png";

function game() {

    // Limpa a tela
    ctx.clearRect(0, 0, 800, 500);

    // Chão
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 800, 500);

    // Movimento automático da paladina
    if (x < mobX) x += velocidade;
    if (x > mobX) x -= velocidade;

    if (y < mobY) y += velocidade;
    if (y > mobY) y -= velocidade;

    // Ataque automático
    if (
        Math.abs(x - mobX) < 40 &&
        Math.abs(y - mobY) < 40
    ) {

        // Nasce outro monstro em posição aleatória
        mobX = Math.random() * 700;
        mobY = Math.random() * 400;
    }

    // Desenha o monstro
    ctx.drawImage(monstro, mobX, mobY, 60, 60);

    // Desenha a paladina
    ctx.drawImage(paladina, x, y, 60, 60);

    requestAnimationFrame(game);
}

game();