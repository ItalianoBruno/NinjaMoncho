// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/Cielo.webp");
    this.load.image("piso", "./public/assets/platform.png");
    this.load.image("ninja", "./public/assets/ninja.png");
    this.load.image("diamante", "./public/assets/diamond.png");
    this.load.image("traingulo", "./public/assets/triangle.png"); 
    this.load.image("cuadrado", "./public/assets/square.png");
  }

create() {

  //Cielo
    this.add.image(400, 300, "sky").setScale(1.85).setAngle(180);

  //Ninja
    const ninja = this.physics.add.image(400, 100, "ninja").setScale(0.125);
    ninja.setCollideWorldBounds(true); // No salir de los límites del mundo

  //Plataforma
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 570, "piso").setScale(2).refreshBody();  
    this.physics.add.collider(ninja, platforms);

    

  //Crear objetos
    const objects = this.physics.add.group();

    const creaForma = () => {
          const x = Phaser.Math.Between(50, 750); // Posición aleatoria en el eje X
        const y = Phaser.Math.Between(50, 100); // Posición aleatoria en la parte superior
        const type = Phaser.Math.RND.pick(["diamante", "traingulo", "cuadrado"]); // Seleccionar tipo aleatorio
        const obj = objects.create(x, y, type).setScale(0.5); // Crear objeto
        this.physics.add.collider(obj, platforms); // Colisión con la plataforma
        obj.setVelocityY(Phaser.Math.Between(50, 100)); // Velocidad aleatoria hacia abajo
        obj.setBounce(0.5); // Rebote al chocar con la plataforma
        }
    //--- Temporizador
    this.time.addEvent({
      delay: 1000, // Intervalo de 5 segundos
      callback: creaForma, // Función a ejecutar
      loop: true, // Repetir indefinidamente
  });

    //---Ninja - Colisión entre el ninja y las formas
    this.physics.add.overlap(ninja, objects, (ninja, obj) => {
      this.puntos += 1; // Incrementar el contador de puntos
      this.puntosText.setText("Puntos: " + this.puntos); // Actualizar el texto de puntos
      obj.destroy(); });// Destruir el objeto al tocarlo 
    
    //---Objetos - Colisión entre objetos y plataforma
      this.physics.add.collider(objects, platforms, (obj, platform) => {
        // Retrasar la destrucción del objeto
       this.time.delayedCall(5000, () => {
            obj.destroy(); // Destruir el objeto después del retraso
        });
      });

      //Temporizador
    this.tiempo = 30
    this.tiempoText = this.add.text(600, 16, "Tiempo: 30", {
        fontSize: "32px",
        fill: "#fff",
      });
      //Contador de Puntos
    this.puntos = 0;
    this.puntosText = this.add.text(16, 16, "Puntos: " + this.puntos , {
        fontSize: "32px",
        fill: "#fff",
      });

      //Configurar teclas WASD 
    this.cursors = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      R: Phaser.Input.Keyboard.KeyCodes.R,
      Barra: Phaser.Input.Keyboard.KeyCodes.SPACE,
  });


  
  this.InAir = true; // Variable para controlar el estado de salto
  this.ninja = ninja; // Guardar referencia al ninja para usar en update
  }
    //

  update() {
   // update game objects
 // --- Reinicio ---
  // Reiniciar la escena si se presiona la tecla R 
  if (Phaser.Input.Keyboard.JustDown(this.cursors.R)) {
    this.scene.restart(); // Reiniciar la escena
  }
   // Movimiento del ninja con WASD
    //--- Izquierda y derecha ---
   if (this.cursors.A.isDown) {
       this.ninja.setVelocityX(-200)
       if (this.ninja.body.touching.down) {
           this.ninja.angle -= 5;
       }
       ; // Mover a la izquierda
   }  
   if (this.cursors.D.isDown) {
       this.ninja.setVelocityX(200);
       if (this.ninja.body.touching.down) {
        this.ninja.angle += 5;
    } // Mover a la derecha
   } 
    //--- No Muv ---
   if (this.cursors.A.isDown && this.cursors.D.isDown) {
       this.ninja.setVelocityX(0);// Detener movimiento horizontal 
   }
   if (this.cursors.A.isUp && this.cursors.D.isUp) {
       this.ninja.setVelocityX(0); // Detener movimiento horizontal
   }
    //--- Arriba y abajo ---
   if (this.cursors.W.isDown && this.ninja.body.touching.down) {
       this.ninja.setVelocityY(-320); // Saltar
   }
   if (this.cursors.S.isDown && this.InAir && !this.ninja.body.touching.down) {
       this.ninja.setVelocityY(200);
       this.InAir = false; // Cambiar el estado a "en el suelo"
   }
   //--- Aire Chek ---  
   if (this.ninja.body.touching.down) {
       this.InAir = true; // Cambiar el estado a "en el suelo"
   }
   if (Phaser.Input.Keyboard.JustDown(this.cursors.Barra)){
    if (this.cursors.A.isDown) {
      this.ninja.setVelocity(   
       this.ninja.body.velocity.x + -30000,
       this.ninja.body.velocity.y + 75 
      ); // Detener movimiento vertical
  }  
  if (this.cursors.D.isDown) {
    this.ninja.setVelocity(
     this.ninja.body.velocity.x + 30000,
     this.ninja.body.velocity.y + 75 
    ); // Detener movimiento vertical
} 
   }
  }
}
//--- Fin ---