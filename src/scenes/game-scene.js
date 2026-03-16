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
  /** @type {Phaser.GameObjects.Image[]} the falling objects for the player to collect */
  #fallingObjects;
  /** @type {string[]} the list of frames from the falling object spritesheet that we loaded in */
  #fallingObjectFrames;
  /** @type {number} how fast the objects will fall */
  #fallingObjectsSpeed;

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
    this.#fallingObjectsSpeed = 2;
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
    this.#player = this.add.image(width / 2, height, ASSET_KEYS.JAR).setDepth(1);

    /*
    // example of how display width uses our scaling
    console.log(this.#player.width, this.#player.displayWidth);
    this.#player.setScale(0.5);
    console.log(this.#player.width, this.#player.displayWidth);
    */

    // adds support for keyboard input in our game (arrow keys, enter, and shift)
    this.#cursorKeys = this.input.keyboard.createCursorKeys();

    // keep track of the falling objects the player collects
    this.#fallingObjects = [];
    this.#fallingObjectFrames = Object.keys(this.textures.get(ASSET_KEYS.OBJECTS).frames).filter(
      (name) => name !== '__BASE', // base is a default frame added by phaser
    );

    // time event to spawn objects
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.#spawnFallingObject,
      callbackScope: this,
    });
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

    // move the objects down the screen and remove them when they are off screen
    for (let i = this.#fallingObjects.length - 1; i >= 0; i--) {
      const obj = this.#fallingObjects[i];
      obj.y += this.#fallingObjectsSpeed;

      // check to see if object overlaps with player
      const overlapPoints = Phaser.Geom.Intersects.GetRectangleToRectangle(this.#player.getBounds(), obj.getBounds());
      // object is overlapping
      if (overlapPoints.length > 0) {
        obj.destroy();
        this.#fallingObjects.splice(i, 1);
      }

      if (obj.y > this.scale.height) {
        obj.destroy();
        this.#fallingObjects.splice(i, 1);
      }
    }
  }

  #spawnFallingObject() {
    const randomFrame = Phaser.Utils.Array.GetRandom(this.#fallingObjectFrames);
    const obj = this.add
      .image(Phaser.Math.RND.between(50, this.scale.width - 50), -20, ASSET_KEYS.OBJECTS, randomFrame)
      .setScale(0.75);
    this.#fallingObjects.push(obj);
    console.log(this.#fallingObjects.length);
  }
}
