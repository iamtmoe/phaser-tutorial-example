// import Phaser from "phaser";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoyStick-plugin.js';
import bomb from './assets/bomb.png'
import collect from './assets/collect.mp3'
import dude from './assets/dude.png'
import kill from './assets/kill.mp3'
import musicUrl from './assets/music.mp3'
import platform from './assets/platform.png'
import spritesheet from './assets/spritesheet.png'
import spriteJson from './assets/spritesheet.json'
import star from './assets/star.png'
import musicon from './assets/musicon.svg'
import musicoff from './assets/musicoff.svg'


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        parent: document.body,
        mode: Phaser.Scale.FIT,
        // width: 800,
        // height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    plugins: {
        global: [{
            key: 'rexVirtualJoystick',
            plugin: VirtualJoystickPlugin,
            start: true
        },
        // ...
        ]
    }
};

var player;
var beauty;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var joyStick
var gameStart = false
var music

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}

function getScreenCenter() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    return {screenCenterX, screenCenterY}
}

var game = new Phaser.Game(config);

function preload() {
    // this.load.image('sky', './assets/sky.png');
    this.load.image('ground', platform);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    this.load.atlas("spritesheet", spritesheet, spriteJson);
    // this.load.plugin('rexvirtualjoyStickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoyStickplugin.min.js', true);
    this.load.audio("collect",collect)
    this.load.audio("kill",kill)
    this.load.svg('musicon', musicon)
    this.load.svg('musicoff', musicoff)
    this.load.audio("music", musicUrl)
}

function create() {
    //  A simple background for our game
    // this.add.image(400, 300, 'sky');
    beauty = this.add.sprite(400, 300, 'spritesheet');


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    // beauty.setBounce(0.2);
    // beauty.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: [
            { key: 'spritesheet', frame: "cy0.png" },
            { key: 'spritesheet', frame: "cy1.png" },
            { key: 'spritesheet', frame: "cy2.png" },
            { key: 'spritesheet', frame: "cy3.png" },
            { key: 'spritesheet', frame: "cy4.png" },
            { key: 'spritesheet', frame: "cy5.png" },
            { key: 'spritesheet', frame: "cy6.png" },
            { key: 'spritesheet', frame: "cy7.png" },
            { key: 'spritesheet', frame: "cy8.png" },
            { key: 'spritesheet', frame: "cy9.png" },
        ],
        frameRate: 0.3,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    // console.log('anims', this.anims.anims.entries);
    beauty.anims.play('attack', true);

    this.sound.add('collect')
    this.sound.add('kill')

    const musicon = this.add.image(750, 50, 'musicon');
    const musicoff = this.add.image(750, 50, 'musicoff');
    music = this.sound.add('music',{loop: true})
    musicoff.setVisible(false)
    musicon.addListener('pointerdown', () => {
        music.pause();
        musicon.setVisible(false);
        musicoff.setVisible(true)
    })
    musicoff.addListener('pointerdown', () => {music.resume();musicoff.setVisible(false);musicon.setVisible(true)})

    is_touch_enabled() && (joyStick = this.plugins.get('rexVirtualJoystick').add(this, {
        x: 140,
        y: 480,
        radius: 100,
    }));
    if(window.innerHeight > window.innerWidth) {
        const p = document.createElement('p')
        p.innerText = '横屏体验更佳'
        p.style.textAlign = 'center'
        document.body.appendChild(p)
        window.addEventListener('resize', () => {
            console.log('resize')
            if(window.innerHeight > window.innerWidth) {
                p.style.display = 'block'
            } else {
                p.style.display = 'none'
            }
        })
        window.addEventListener('deviceorientation', () => {
            console.log('deviceorientation')
            if(window.innerHeight > window.innerWidth) {
                p.style.display = 'block'
            } else {
                p.style.display = 'none'
            }
        })
    }
    if(!gameOver) {
        if(this.sys.game.device.fullscreen.available) {
            const {screenCenterX, screenCenterY} = getScreenCenter.call(this)
            const button = this.add.dom(screenCenterX, screenCenterY, 'button', 'width: 100px; height: 50px; border-radius: 20px;cursor: pointer; border-color: yellow', 'start').setOrigin(0.5);
            button.addListener('click')
            button.on('click', () => { 
                document.body[this.sys.game.device.fullscreen.request](); 
                button.setVisible(false)
                gameStart = true; 
                music.play();
                musicon.setInteractive()
                musicoff.setInteractive()
            })
        }  else {
            gameStart = true; 
            music.play();
            musicon.setInteractive()
            musicoff.setInteractive()
        }
        
    } else {
        gameOver = false
        musicon.setInteractive()
        musicoff.setInteractive()
        music.play()
    }
}

function update() {
    if (gameOver || !gameStart) {
        return;
    }

    if (cursors.left.isDown || (is_touch_enabled() && joyStick.left)) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || (is_touch_enabled() && joyStick.right)) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if ((cursors.up.isDown || (is_touch_enabled() && joyStick.up)) && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    this.sound.play('collect')
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.sound.play('kill')

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    const {screenCenterX, screenCenterY} = getScreenCenter.call(this)
    const button = this.add.dom(screenCenterX, screenCenterY, 'button', 'width: 100px; height: 50px; border-radius: 20px;cursor: pointer; border-color: yellow', 'play again').setOrigin(0.5);
    button.addListener('click')
    button.on('click', () => { music.stop(); this.scene.restart() })
}