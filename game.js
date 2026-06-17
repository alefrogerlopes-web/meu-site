const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Herói
let x = 100;
let y = 100;
let velocidade = 1.5;

// Status do herói
let vida = 100;
let xp = 0;
let nivel = 1;
let ouro = 0;

// Monstro
let mobX = 500;
let mobY = 250;

function game() {

    // Limpa a tela
    ctx.clearRect(0, 0, 800, 500);

    // Fundo
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 800, 500);

    // Movimento automático do herói
    if (x < mobX) x += velocidade;
    if (x > mobX) x -= velocidade;

    if (y < mobY) y += velocidade;
    if (y > mobY) y -= velocidade;

    // Ataque automático
    if (
        Math.abs(x - mobX) < 40 &&
        Math.abs(y - mobY) < 40
    ) {

        // Ganha experiência e ouro
        xp += 10;
        ouro += 5;

        // Sobe de nível
        if (xp >= nivel * 100) {
            nivel++;
            velocidade += 0.2;
            vida = 100;
        }

        // Novo monstro em posição aleatória
        mobX = Math.random() * 700;
        mobY = Math.random() * 400;
    }

    // Barra de vida
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, vida * 2, 20);

    // Informações do herói
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("❤️ Vida: " + vida, 20, 60);
    ctx.fillText("⭐ XP: " + xp, 20, 90);
    ctx.fillText("📈 Nível: " + nivel, 20, 120);
    ctx.fillText("🪙 Ouro: " + ouro, 20, 150);

    // Monstro
    ctx.font = "40px Arial";
    ctx.fillText("👹", mobX, mobY + 35);

    // Herói
    ctx.fillText("🧙", x, y + 35);

    requestAnimationFrame(game);
}

game();