import Phaser from '../../lib/phaser.js';

const { START, PRE_RENDER, SHUTDOWN, DESTROY } = Phaser.Scenes.Events;

export class DebugDrawPlugin extends Phaser.Plugins.ScenePlugin {
  boot() {
    this.systems.events
      .on(START, this.sceneStart, this)
      .on(PRE_RENDER, this.scenePreRender, this)
      .on(SHUTDOWN, this.sceneShutdown, this)
      .once(DESTROY, this.sceneDestroy, this);

    if (this.systems.settings.isBooted) {
      this.sceneStart();
    }
  }

  sceneStart() {
    this.graphic = this.scene.add.graphics().setDepth(Number.MAX_VALUE);
  }

  sceneShutdown() {
    if (this.graphic) {
      this.graphic.destroy();
      this.graphic = null;
    }
  }

  scenePreRender() {
    this.graphic.clear();
    this.graphic.lineStyle(1, 0xffff00, 1); // 1px yellow

    for (const gameObject of this.systems.displayList.list) {
      if (gameObject.type === 'Image') {
        const bounds = /** @type {Phaser.GameObjects.Image} */ (gameObject).getBounds();
        this.graphic.strokeRectShape(bounds);
      }
    }
  }

  sceneDestroy() {
    this.systems.events
      .off(START, this.sceneStart, this)
      .off(PRE_RENDER, this.scenePreRender, this)
      .off(SHUTDOWN, this.sceneShutdown, this)
      .off(DESTROY, this.sceneDestroy, this);

    this.scene = null;
    this.systems = null;
  }
}

export default DebugDrawPlugin;
