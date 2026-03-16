import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_KEYS } from '../common/assets.js';

export class GameScene extends Phaser.Scene {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} handles player input */
  #cursorKeys;
  /** @type {Phaser.GameObjects.Image} the player (jar) in our game */
  #player;
  /** @type {number} how fast our player can move in our game */
  #playerSpeed;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time at start of the lifecycle.
   *  Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  init() {
    this.#playerSpeed = 5;
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time after the PRELOAD
   * logic is finished. Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  create() {
    if (!this.input) {
      console.warn('Input plugin is not available');
      return;
    }

    // get scene width and height
    const { width, height } = this.scale;

    // add game background
    this.add.image(width / 2, height / 2, ASSET_KEYS.BACKGROUND);
    // add player
    this.#player = this.add.image(width / 2, height, ASSET_KEYS.JAR);

    /*
    // example of how display width uses our scaling
    console.log(this.#player.width, this.#player.displayWidth);
    this.#player.setScale(0.5);
    console.log(this.#player.width, this.#player.displayWidth);
    */

    // add a collectable object
    this.add.image(width / 2, height / 2, ASSET_KEYS.OBJECTS, 'button1.png').setScale(0.75);

    // adds support for keyboard input in our game (arrow keys, enter, and shift)
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one multiple times per second (fps),
   * or once for every tick of the game loop. Generally, Phaser will attempt to run
   * this 60 times per second (fps), depends on hardware, browser, and game settings.
   * @returns {void}
   */
  update() {
    // allow player to move
    if (this.#cursorKeys.left.isDown) {
      this.#player.x -= this.#playerSpeed;
    } else if (this.#cursorKeys.right.isDown) {
      this.#player.x += this.#playerSpeed;
    }
    // keep player within the game bounds
    if (this.#player.x - this.#player.displayWidth / 2 < 0) {
      this.#player.x = this.#player.displayWidth / 2;
    } else if (this.#player.x + this.#player.displayWidth / 2 > this.scale.width) {
      this.#player.x = this.scale.width - this.#player.displayWidth / 2;
    }
  }
}
