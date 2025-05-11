export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("perder"); // Nombre de la escena
  }

  init(data) {
    // Recibir datos de la escena anterior
    this.puntos = data.puntos;
    this.tiempo = data.tiempo;
    this.jTiempo = data.jTiempo;
  }

  preload() { 
    this.load.image("sky", "./public/assets/Cielo.webp");
  }
  create() {
    // Fondo
    this.add.image(400, 300, "sky").setScale(1.85);
    // Mostrar mensaje de "Perdiste"
    this.add.text(400, 200, "¡Perdiste!", {
      fontSize: "48px",
      fill: "#ff0000",
    }).setOrigin(0.5);

    // Mostrar los puntos obtenidos
    this.add.text(400, 300, `Puntos: ${this.puntos}`, {
      fontSize: "32px",
      fill: "#ffffff",
    }).setOrigin(0.5);

    // Mostrar el tiempo que tardaste
    this.add.text(400, 350, `Tiempo: ${this.jTiempo} segundos`, {
      fontSize: "32px",
      fill: "#ffffff",
    }).setOrigin(0.5);

    // Botón para reiniciar el juego
    const restartText = this.add.text(400, 450, "Presiona R para reiniciar", {
      fontSize: "24px",
      fill: "#ffffff",
    }).setOrigin(0.5);

    // Detectar la tecla R para reiniciar
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("hello-world"); // Volver a la escena principal
    });
  }
}