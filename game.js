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
let monstrosMortos = 0;

// Monstro comum
let mobX = 500;
let mobY = 250;

// Boss
let bossAtivo = false;
let bossVida = 500;
let bossX = 600;
let bossY = 250;

// Poderes
let fogoAtivo = false;
let velocidadeExtra = false;

// Controles
document.addEventListener("keydown", (e) => {

    // Bola de fogo
    if (e.key === "f") {
        fogoAtivo = true;

        setTimeout(() => {
            fogoAtivo = false;
        }, 3000);
    }

    // Cura
    if (e.key === "c") {
        vida += 20;

        if (vida > 100) {
            vida = 100;
        }
    }

    // Super velocidade
    if (e.key === "v" && !velocidadeExtra) {

        velocidadeExtra = true;
        velocidade += 2;

        setTimeout(() => {
            velocidade -= 2;
            velocidadeExtra = false;
        }, 5000);
    }
});

function game() {

    // Limpar tela
    ctx.clearRect(0, 0, 800, 500);

    // Fundo
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 800, 500);

    // Escolher alvo
    let alvoX = bossAtivo ? bossX : mobX;
    let alvoY = bossAtivo ? bossY : mobY;

    // Movimento automático
    if (x < alvoX) x += velocidade;
    if (x > alvoX) x -= velocidade;

    if (y < alvoY) y += velocidade;
    if (y > alvoY) y -= velocidade;

    // Distância ao alvo
    let distanciaX = Math.abs(x - alvoX);
    let distanciaY = Math.abs(y - alvoY);

    // Combate contra Boss
    if (bossAtivo) {

        if (distanciaX < 40 && distanciaY < 40) {

            bossVida -= 10;

            if (fogoAtivo) {
                bossVida -= 20;
            }

            if (bossVida <= 0) {

                bossAtivo = false;

                xp += 200;
                ouro += 100;

                bossX = Math.random() * 700;
                bossY = Math.random() * 400;
            }
        }

    } else {

        // Combate contra monstro comum
        if (distanciaX < 40 && distanciaY < 40) {

            xp += 10;
            ouro += 5;
            monstrosMortos++;

            if (fogoAtivo) {
                xp += 10;
                ouro += 5;
            }

            // Subir de nível
            if (xp >= nivel * 100) {

                nivel++;
                velocidade += 0.2;
                vida = 100;

                // Boss a cada 10 níveis
                if (nivel % 10 === 0) {

                    bossAtivo = true;
                    bossVida = 500;

                    bossX = Math.random() * 700;
                    bossY = Math.random() * 400;
                }
            }

            // Novo monstro
            mobX = Math.random() * 700;
            mobY = Math.random() * 400;
        }
    }

    // Barra de vida
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, vida * 2, 20);

    // Informações
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("❤️ Vida: " + vida, 20, 60);
    ctx.fillText("⭐ XP: " + xp, 20, 90);
    ctx.fillText("📈 Nível: " + nivel, 20, 120);
    ctx.fillText("🪙 Ouro: " + ouro, 20, 150);
    ctx.fillText("☠️ Monstros mortos: " + monstrosMortos, 20, 180);

    // Poderes
    ctx.fillText("🔥 F = Bola de Fogo", 20, 220);
    ctx.fillText("❤️ C = Cura", 20, 250);
    ctx.fillText("⚡ V = Super Velocidade", 20, 280);

    // Avisos
    if (fogoAtivo) {
        ctx.fillText("🔥 FOGO ATIVO", 550, 40);
    }

    if (velocidadeExtra) {
        ctx.fillText("⚡ VELOCIDADE EXTRA", 550, 70);
    }

    // Boss ou monstro
    ctx.font = "40px Arial";

    if (bossAtivo) {

        ctx.font = "50px Arial";
        ctx.fillText("👹👑", bossX, bossY + 40);

        ctx.font = "20px Arial";
        ctx.fillText("❤️ Boss: " + bossVida, bossX - 10, bossY - 10);

    } else {

        ctx.font = "40px Arial";
        ctx.fillText("👹", mobX, mobY + 35);
    }

    // Herói
    ctx.font = "40px Arial";
    ctx.fillText("🧙", x, y + 35);

    requestAnimationFrame(game);
}

game();