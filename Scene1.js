class Scene1 extends Phaser.Scene {
    constructor() {
    super('inicio');
    }


    preload ()
    {
    this.load.image('background', 'assets/Background.jpg');
    this.load.image('backdown', 'assets/BackDown.png');
    this.load.image('backup', 'assets/BackUp.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('groundV', 'assets/platformV.png');
    this.load.image('backplateV', 'assets/BackPlateV.png')
    this.load.image('backplate', 'assets/BackPlate.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('logo', 'assets/logo.png');

    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('starg', 'assets/StarG.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('starsi', 'assets/starSilv.png', {frameWidth: 32, frameHeight: 32});
    }

    create()
{


    var logo = this.add.image(400, 300, 'background').setScale(1.5)
    this.add.text(290, 200, 'Haz clic', { fontFamily: 'Cooper', fontSize: 60, color: 'white' })
    this.add.text(180, 260, 'para comenzar', { fontFamily: 'Cooper', fontSize: 60, color: 'white' })
    this.add.text(290, 320, 'a jugar!', { fontFamily: 'Cooper', fontSize: 60, color: 'white' })
    logo.setInteractive()
    console.log('asopgj')
    logo.on('pointerdown', () => this.scene.start('juego') );
}
}