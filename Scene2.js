class Scene2 extends Phaser.Scene {
    constructor() {
    super('juego');
    }
    create ()
{
    this.add.image(300, 200, 'background').setScale(1.4)
    this.add.image(400, 50, 'backup');
    this.add.image(400, 485, 'backdown');
    this.add.image(596, 400, 'backplate');
    this.add.image(43, 370, 'backplate');
    this.add.image(745, 220, 'backplate');
    this.add.image(0, 28, 'backplate');
    this.add.image(350, 270, 'backplateV')
    this.add.image(800, 28, 'backplate');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(40, 370, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.create(350, 270, 'groundV')

//spawn y fisica del personaje.
    player = this.physics.add.sprite(100, 450, 'dude');

//propiedades fisicas del personaje.
    player.setBounce(0.15);
    player.setCollideWorldBounds(true);

//ANIMACIONES.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

//INPUTS
    cursors = this.input.keyboard.createCursorKeys();
//ANIMACION ESTRELLAS DORADAS.
    this.anims.create({
        key: 'golden',
        frames: this.anims.generateFrameNumbers('starg', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    }) 
    this.anims.create({
        key: 'silverst',
        frames: this.anims.generateFrameNumbers('starsi', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    }) 

//SPAWN Y FISICA DE ESTRELLAS DORADAS.
    stars = this.physics.add.group({
        key: 'starg',
        repeat: 11,
        setXY:{ x: 82, y: 0, stepX: 140}
    })
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

//SPAWN Y FISICA DE ESTRELLAS PLATEADAS.
    silvers = this.physics.add.group({
        key: 'starsi',
        repeat: 11,
        setXY:{ x: 12, y: 0, stepX: 140}
    })
    silvers.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
//SPAPWN DE BOMBAS
    bombs = this.physics.add.group();

//PUNTAJE
    scoreText = this.add.text(5, 10, 'score: 0', {fontFamily:'cooper', fontSize: '32px', color: 'white' });

//COLISIONES
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(silvers, platforms);
    this.physics.add.collider(stars, platforms);

//FUNCIONES DE RECOLECTAR Y BOMBA.
    this.physics.add.overlap(player, silvers, this.collectSilver, null, this);
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    score = 0;
    gameOver = false;


    initialTime = 30
    timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
    timeText = this.add.text(610, 10, '', { fontFamily:'cooper', fontSize: '32px', color: 'white' });

    this.jumps = 0;


}

update ()
    {
//ANIMACION DE ESTRELLA.
    stars.children.iterate(function (child) {
        child.anims.play('golden', true);
        });
        silvers.children.iterate(function (child) {
        child.anims.play('silverst', true);
        });
    
        if (gameOver)
    {
        return;
    }
//DESPLAZAMIENTO.
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(180);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-400);
    }
}

collectStar (player, star)
{
    star.disableBody(true, true);
    score += 15;
    contadorstars += 1;
    console.log('doradas ' + contadorstars)
    scoreText.setText('Score: ' + score);

    if (contadorstars === 6 && contadorsilvers === 6)
    { console.log('ejecutando if gold')
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);
        });
        silvers.children.iterate(function (child) {

    child.enableBody(true, child.x, 0, true, true);
    });
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

        initialTime = 30 - level;
        contadorstars=0
        contadorsilvers=0
    }
}

collectSilver (player, silver)
{
    silver.disableBody(true, true);

    score += 10;
    contadorsilvers += 1;
    console.log('plateadas ' + contadorsilvers)
    scoreText.setText('Score: ' + score);

    if (contadorsilvers === 6 && contadorstars === 6)
    { console.log('ejecutando if gold')
        //  A new batch of stars to collect
        silvers.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);
        });
        stars.children.iterate(function (child) {

    child.enableBody(true, child.x, 0, true, true);
    });
        
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    initialTime = 30 - level;
    contadorstars=0
    contadorsilvers=0
    }
}



hitBomb (player, bomb)
{
    this.gameOver()
}


gameOver() 
{        
    gameOver = true;
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');        

    var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Cooper', fontSize: 70, color: '#ff0000' })
    .setInteractive()
    this.add.text(350, 400, 'Continuar', { fontFamily: 'cooper', fontSize: 20, color: '#ff0000' })
    .setInteractive()
    
    .on('pointerdown', () => this.scene.start('creditos'));
    Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
}

onSecond() 
{
    if (! gameOver)
    {       
        initialTime = initialTime - 1;
        timeText.setText('Timer: ' + initialTime);
        if (initialTime == 0) {
            timedEvent.paused = true;
            this.gameOver()
        }            
    }

}
}