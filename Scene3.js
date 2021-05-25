class Scene3 extends Phaser.Scene {
    constructor() {
    super("creditos");
    }


    preload ()
    {
        this.add.text('Game Over', { fontFamily: 'Cooper', fontSize: 70, color: '#ff0000' })
    }

    create()
{


    var puntajefinal = this.add.text(400, 650, 'Puntos: ' + score,  { fontFamily: 'cooper', fontSize: 50, color: '#ff0000' });
    
    Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));

    this.add.text(200, 200, 'Game Over', { fontFamily: 'Cooper', fontSize: 70, color: '#ff0000' })

    var restartButton = this.add.text(450, 500, 'restart', { fontFamily: 'cooper', fontSize: 20, color: '#ff0000' })
    .setInteractive()
    .on('pointerdown', () => this.reiniciar() );
}

reiniciar() {
    this.scene.start('juego');
    contadorstars=0
    contadorsilvers=0
}





}