const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 800,
    height: 600,
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
}

function create() {

this.input.keyboard.on('keydown-F', () => {

    if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
    } else {
        this.scale.startFullscreen();
    }

});

    // ================= MENU =================
    const sky = this.add.image(400, 300, 'sky1');

    this.time.delayedCall(200, () => sky.setTexture('sky2'));
    this.time.delayedCall(500, () => sky.setTexture('sky3'));
    this.time.delayedCall(900, () => sky.setTexture('sky4'));

    const logo = this.add.image(400, 180, 'logo');
    logo.setScale(3.5);

    const play = this.add.image(400, 400, 'play');
    play.setScale(4);
    play.setInteractive();

    const fade = this.add.rectangle(400, 300, 800, 600, 0x000000);
    fade.setAlpha(0);

    // ================= JOGO (cria mas só ativa depois) =================

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 590, 'platform')
        .setDisplaySize(800, 40)
        .refreshBody();

    platforms.create(400, 450, 'platform')
        .setDisplaySize(200, 40)
        .refreshBody();

    player = this.physics.add.sprite(100, 300, 'idle1');
    player.setScale(2);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    // 🔴 DESATIVA NO COMEÇO (evita bug visual)
    player.setActive(false).setVisible(false);
    platforms.setActive(false).setVisible(false);

    // ================= START GAME =================
    play.on('pointerdown', () => {

        this.tweens.add({
            targets: fade,
            alpha: 1,
            duration: 800,

            onComplete: () => {

                gameStarted = true;

                sky.destroy();
                logo.destroy();
                play.destroy();

                const background = this.add.image(400, 300, 'background1');
                background.setDepth(-1);

                // 🔵 ativa jogo aqui
                player.setActive(true).setVisible(true);
                platforms.setActive(true).setVisible(true);

                this.tweens.add({
                    targets: fade,
                    alpha: 0,
                    duration: 800,

                    onComplete: () => fade.destroy()
                });
            }
        });
    });
}

function update() {

    if (!gameStarted) return;

    const onGround = player.body.blocked.down;

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
}