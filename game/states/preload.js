'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('frame', 'assets/kehys.png');
    this.load.image('background', 'assets/karttatausta.png');
    this.load.spritesheet('point', 'assets/karttapiste.png', 44, 44, 2, 5, 10);
    this.load.spritesheet('start-end', 'assets/lahto_maali.png', 90, 113, 2, 5, 5);
    this.load.spritesheet('add-point', 'assets/lisaa_piste.png', 210, 86, 2, 5, 10);
    this.load.spritesheet('remove-point', 'assets/poista_piste.png', 210, 86, 2, 5, 10);
    this.load.spritesheet('add-startpoint', 'assets/lisaa_aloitus_lopetus.png', 210, 86, 2, 5, 10);
    this.load.spritesheet('button', 'assets/painike.png', 210, 86, 2, 5, 10);
    this.load.image('point-edit-screen', 'assets/valintojen_tausta.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('editor');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
