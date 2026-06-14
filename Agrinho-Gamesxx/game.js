const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
},
    backgroundColor: '#87CEEB',


    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;
let walkFrame = 0;
let idleFrame = 0;
let gameStarted = false;

let faseAtual = 1;
let telasDaFase = 0;
let background;
let telaAtual = 1;
let lagarta;
let musica;
let vidas = 5;
let barraVida;
let tomandoDano = false;
let fundoInvertido = false;


let somDano;

let cutscene;
let botaoPular;
let etapaCutscene = 1;

let espada;
let temEspada = false;
let atacando = false;
let attackFrame = 0;

let spaceKey;

let lagartaViva = true;

let direcaoLagarta = 1;

let urso;
let ursoFrame = 0;
let cutsceneUrsoAberta = false;

let falouComUrso = false;
let falaUrso;
let etapaFalaUrso = 1;

let fazendeiroJoaninha;
let fazendeiroFrame = 0;
let falouComFazendeiro = false;

function criarTela(numero) {

    platforms.clear(true, true);

    // FASE 1 - TELA 1
    if (numero === 1) {

        platforms.create(400, 590, 'platform')
            .setDisplaySize(800, 40)
            .refreshBody();

        platforms.create(400, 450, 'platform')
            .setDisplaySize(200, 40)
            .refreshBody();
    }

    // FASE 1 - TELA 2
    else if (numero === 2) {

    platforms.create(400, 590, 'platform')
        .setDisplaySize(800, 40)
        .refreshBody();
}

    // FASE 2 - TELA 1
    else if (numero === 3) {

        platforms.create(400, 590, 'platform')
            .setDisplaySize(800, 40)
            .refreshBody();

        platforms.create(150, 450, 'platform')
            .setDisplaySize(150, 40)
            .refreshBody();

        platforms.create(500, 350, 'platform')
            .setDisplaySize(150, 40)
            .refreshBody();
    }

    // FASE 2 - TELA 2
else if (numero === 4) {

    platforms.create(400, 590, 'platform')
        .setDisplaySize(800, 40)
        .refreshBody();
}

    // FASE 3+
    else {

        platforms.create(400, 590, 'platform')
            .setDisplaySize(800, 40)
            .refreshBody();
    }
}


function preload() {

    this.load.image('walk1', 'assets/walk1.png');
    this.load.image('walk2', 'assets/walk2.png');
    this.load.image('walk3', 'assets/walk3.png');
    this.load.image('idle1', 'assets/idle1.png');
    this.load.image('idle2', 'assets/idle2.png');

    this.load.image('sky1', 'assets/sky1.png');
    this.load.image('sky2', 'assets/sky2.png');
    this.load.image('sky3', 'assets/sky3.png');
    this.load.image('sky4', 'assets/sky4.png');

    this.load.image('logo', 'assets/logo.png');
    this.load.image('play', 'assets/play.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('background1', 'assets/background1.png');
    this.load.image('background2', 'assets/background2.png');
    this.load.image('background3', 'assets/background3.png');
    this.load.image('background4', 'assets/background4.png');
    this.load.image('lagarta', 'assets/lagarta.png');
    this.load.image('vida5', 'assets/vida5.png');
    this.load.image('vida4', 'assets/vida4.png');
    this.load.image('vida3', 'assets/vida3.png');
    this.load.image('vida2', 'assets/vida2.png');
    this.load.image('vida1', 'assets/vida1.png');
    this.load.image('vida0', 'assets/vida0.png');
    this.load.audio('musica', 'assets/musica.mp3');
    this.load.audio('dano', 'assets/dano.wav');
    this.load.image('cutscene1', 'assets/cutscene1.png');
    this.load.image('cutscene2', 'assets/cutscene2.png');
    this.load.image('skip', 'assets/skip.png');
    this.load.image('espada', 'assets/espada.png');
    this.load.image('ataque1', 'assets/ataque1.png');
    this.load.image('ataque2', 'assets/ataque2.png');
    this.load.image('ataque3', 'assets/ataque3.png');
    this.load.image('ataque4', 'assets/ataque4.png');
    this.load.image('urso1', 'assets/urso1.png');
    this.load.image('urso2', 'assets/urso2.png');
    this.load.image('ursofala1', 'assets/ursofala1.png');
    this.load.image('ursofala2', 'assets/ursofala2.png');
    this.load.image('ursofala3', 'assets/ursofala3.png');
    this.load.image('fazendeirojoaninha1', 'assets/fazendeirojoaninha1.png');
    this.load.image('fazendeirojoaninha2', 'assets/fazendeirojoaninha2.png');

}


function create() {



    // ================= MENU =================
    const sky = this.add.image(400, 300, 'sky1');

    this.time.delayedCall(200, () => sky.setTexture('sky2'));
    this.time.delayedCall(500, () => sky.setTexture('sky3'));
    this.time.delayedCall(900, () => sky.setTexture('sky4'));
    this.time.delayedCall(900, () => {
    sky.setTexture('sky4');

    play.setVisible(true);
    play.setInteractive();
});

    const logo = this.add.image(400, 180, 'logo');
    logo.setScale(3.5);

    const play = this.add.image(400, 400, 'play');
    play.setScale(4);
    play.setVisible(false);

    const fade = this.add.rectangle(400, 300, 800, 600, 0x000000);
    fade.setAlpha(0);
    musica = this.sound.add('musica', {
    loop: true,
    volume: 0.4
});
    somDano = this.sound.add('dano', {
    volume: 0.8
});
    barraVida = this.add.image(680, 40, 'vida5');
    barraVida.setScale(1);
    barraVida.setVisible(false);

    // ================= JOGO (cria mas só ativa depois) =================

    platforms = this.physics.add.staticGroup();

    criarTela(1);

    player = this.physics.add.sprite(100, 300, 'idle1');
    player.setScale(2);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    // ⚔️ ESPADA
   espada = this.physics.add.sprite(400, 400, 'espada');
   espada.setScale(0.8);
   espada.body.allowGravity = false;
    

    lagarta = this.physics.add.sprite(600, 450, 'lagarta');
    lagarta.setScale(1.5);
    lagarta.body.allowGravity = false;

    lagarta.disableBody(true, true);

    lagarta.setActive(false);
    lagarta.setVisible(false);

    // 🐻 URSO NPC
   urso = this.physics.add.sprite(600, 570, 'urso1');
   urso.setScale(1);
   urso.body.allowGravity = false;

urso.disableBody(true, true);

// 👨‍🌾🐞 FAZENDEIRO + JOANINHA
fazendeiroJoaninha = this.physics.add.sprite(600, 470, 'fazendeirojoaninha1');
fazendeiroJoaninha.setScale(2);
fazendeiroJoaninha.body.allowGravity = false;

fazendeiroJoaninha.disableBody(true, true);

    this.physics.add.collider(player, platforms);

    this.physics.add.overlap(player, lagarta, perderVida, null, this);
    this.physics.add.overlap(player, urso, conversarComUrso, null, this);
    this.physics.add.overlap(player, espada, pegarEspada, null, this);

    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // 🔴 DESATIVA NO COMEÇO (evita bug visual)
    player.setActive(false).setVisible(false);
    platforms.setActive(false).setVisible(false);
    espada.setActive(false).setVisible(false);

    // ================= START GAME =================
    
    play.on('pointerdown', () => {

    const scene = this;

    sky.destroy();
    logo.destroy();
    play.destroy();

    const escuro = scene.add.rectangle(400, 300, 800, 600, 0x000000);
    escuro.setAlpha(0.75);

    cutscene = scene.add.image(400, 300, 'cutscene1');
    cutscene.setDisplaySize(800, 600);
    cutscene.setDepth(5);
    cutscene.setInteractive();

    botaoPular = scene.add.image(700, 80, 'skip');
    botaoPular.setScale(4);
    botaoPular.setDepth(10);
    botaoPular.setInteractive();

    botaoPular.on('pointerdown', () => {

    if (etapaCutscene === 1) {
        etapaCutscene = 2;
        cutscene.setTexture('cutscene2');
        cutscene.setDisplaySize(800, 600);
    } else {
        iniciarJogo();
    }
});

    function iniciarJogo() {

        escuro.destroy();
        cutscene.destroy();
        botaoPular.destroy();

        gameStarted = true;

        background = scene.add.image(400, 300, 'background1');
        background.setDepth(-1);

        player.setActive(true).setVisible(true);
        platforms.setActive(true).setVisible(true);
        espada.setActive(true).setVisible(true);

        barraVida.setVisible(true);

        musica.play();
    }
});

}
function atacarLagarta() {

    if (!lagartaViva) return;

    const distancia = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        lagarta.x,
        lagarta.y
    );

    if (distancia < 215) {

        lagarta.disableBody(true, true);

        lagartaViva = false;

        console.log("LAGARTA MORTA!");
    }
}

function pegarEspada(player, espada) {

    temEspada = true;

    espada.destroy();

    console.log("PEGOU A ESPADA!");
}

function conversarComUrso() {

    if (falouComUrso) return;

    falouComUrso = true;
    gameStarted = false;

    const escuroUrso = this.add.rectangle(400, 300, 800, 600, 0x000000);
    escuroUrso.setAlpha(0.75);
    escuroUrso.setDepth(19);

    falaUrso = this.add.image(400, 300, 'ursofala1');
    falaUrso.setDisplaySize(800, 600);
    falaUrso.setDepth(20);
    falaUrso.setInteractive();

    falaUrso.on('pointerdown', () => {

        if (etapaFalaUrso === 1) {
            etapaFalaUrso = 2;
            falaUrso.setTexture('ursofala2');
            falaUrso.setDisplaySize(800, 600);
        }

        else if (etapaFalaUrso === 2) {
            etapaFalaUrso = 3;
            falaUrso.setTexture('ursofala3');
            falaUrso.setDisplaySize(800, 600);
        }

        else {
            falaUrso.destroy();
            escuroUrso.destroy();

            gameStarted = true;
        }
    });
}

function perderVida() {

    if (tomandoDano) return;

    somDano.play();

    tomandoDano = true;

    vidas--;

    if (vidas < 0) {
        vidas = 0;
    }

    barraVida.setTexture('vida' + vidas);

    player.x = 50;
    player.y = 300;

    if (vidas === 0) {
        vidas = 5;
        barraVida.setTexture('vida5');

        faseAtual = 1;
        telasDaFase = 0;
        telaAtual = 1;

        background.setTexture('background1');
        criarTela(1);

        lagarta.disableBody(true, true);

        player.x = 50;
        player.y = 300;
    }

    setTimeout(() => {
        tomandoDano = false;
    }, 1000);
}

function update() {

    if (!gameStarted) return;

    // 🐻 ANIMAÇÃO DO URSO
if (urso && urso.active) {
    ursoFrame++;

    if (ursoFrame < 30) {
        urso.setTexture('urso1');
    }
    else if (ursoFrame < 60) {
        urso.setTexture('urso2');
    }
    else {
        ursoFrame = 0;
    }
}

// 👨‍🌾🐞 ANIMAÇÃO DO FAZENDEIRO + JOANINHA
if (fazendeiroJoaninha && fazendeiroJoaninha.active) {
    fazendeiroFrame++;

    if (fazendeiroFrame < 30) {
        fazendeiroJoaninha.setTexture('fazendeirojoaninha1');
    }
    else if (fazendeiroFrame < 60) {
        fazendeiroJoaninha.setTexture('fazendeirojoaninha2');
    }
    else {
        fazendeiroFrame = 0;
    }
}

    // 🐛 MOVIMENTO DA LAGARTA
if (lagarta && lagarta.active) {

    if (lagarta.x > 700) {
        direcaoLagarta = -1;
        lagarta.setFlipX(true);
    }

    if (lagarta.x < 500) {
        direcaoLagarta = 1;
        lagarta.setFlipX(false);
    }

    lagarta.setVelocityX(80 * direcaoLagarta);
}

    const onGround = player.body.blocked.down;
   if (Phaser.Input.Keyboard.JustDown(spaceKey) && temEspada && !atacando) {

    atacando = true;
    attackFrame = 0;

    atacarLagarta();
}
if (atacando) {

    attackFrame++;

    if (attackFrame < 6) {
        player.setTexture('ataque1');
    }
    else if (attackFrame < 12) {
        player.setTexture('ataque2');
    }
    else if (attackFrame < 18) {
        player.setTexture('ataque3');
    }
    else if (attackFrame < 24) {
        player.setTexture('ataque4');
    }
    else {
        atacando = false;
        attackFrame = 0;
    }

    return;
}

    // 👉 MOVIMENTO
    if (cursors.left.isDown) {

        player.setVelocityX(-200);
        player.setFlipX(true);

        walkFrame++;

        if (walkFrame < 10) player.setTexture('walk1');
        else if (walkFrame < 20) player.setTexture('walk2');
        else if (walkFrame < 30) player.setTexture('walk3');
        else walkFrame = 0;
    }

    else if (cursors.right.isDown) {

        player.setVelocityX(200);
        player.setFlipX(false);

        walkFrame++;

        if (walkFrame < 10) player.setTexture('walk1');
        else if (walkFrame < 20) player.setTexture('walk2');
        else if (walkFrame < 30) player.setTexture('walk3');
        else walkFrame = 0;
    }

    else {

        player.setVelocityX(0);

        if (onGround) {

            idleFrame++;

            if (idleFrame < 30) player.setTexture('idle1');
            else if (idleFrame < 60) player.setTexture('idle2');
            else idleFrame = 0;
        }
    }

    // 👉 PULO
    if (cursors.up.isDown && onGround) {
        player.setVelocityY(-500);
    }

    // 👉 PRÓXIMA TELA
    if (player.x >= 740) {

        telasDaFase++;
        telaAtual++;

        player.x = 50;
        player.y = 300;

        criarTela(telaAtual);

        // 👨‍🌾🐞 FAZENDEIRO + JOANINHA NA FASE 1 - TELA 2
if (telaAtual === 2) {
    fazendeiroJoaninha.enableBody(true, 600, 520, true, true);
} else {
    fazendeiroJoaninha.disableBody(true, true);
}

        // 🐻 URSO NA FASE 2 - TELA 2
if (telaAtual === 4) {

    urso.enableBody(true, 600, 500, true, true);

} else {

    urso.disableBody(true, true);
}

        fundoInvertido = !fundoInvertido;
        background.setFlipX(fundoInvertido);

        // A cada 2 telas muda de fase
        if (telasDaFase >= 2) {

            faseAtual++;
            telasDaFase = 0;

            if (faseAtual === 2) {
                background.setTexture('background2');
            }

            else if (faseAtual === 3) {
                background.setTexture('background3');

                lagarta.enableBody(true, 600, 550, true, true);

                lagarta.body.allowGravity = false;
                lagarta.setVelocityX(80);

            }

            else if (faseAtual === 4) {
                background.setTexture('background4');
            }

            console.log("FASE", faseAtual);
        }
    }
}