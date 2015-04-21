'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.addLoadingIndicator();
    this.load.image('frame', 'assets/kehys.png');
    this.load.image('background', 'assets/karttatausta.png');
    this.load.spritesheet('point', 'assets/karttapiste.png', 44, 44, 2, 5, 10);
    this.load.spritesheet('start-end', 'assets/lahto_maali.png', 90, 113, 2, 5, 5);
    this.load.spritesheet('add-point', 'assets/lisaa_piste.png', 155, 62, 2, 5, 10);
    this.load.spritesheet('remove-point', 'assets/poista_piste.png', 155, 62, 2, 5, 10);
    this.load.spritesheet('add-startpoint', 'assets/lisaa_aloitus_lopetus.png', 155, 62, 2, 5, 10);
    this.load.spritesheet('button', 'assets/painike.png', 210, 86, 2, 5, 10);
    this.load.spritesheet('next-state', 'assets/seuraava.png', 78, 72, 3, 5, 10);
    this.load.spritesheet('previous-state', 'assets/edellinen.png', 78, 72, 3, 5, 10);
    this.load.image('point-edit-screen', 'assets/etapin_muokkaus_tausta.png');
    this.load.spritesheet('close-button', 'assets/sulje.png', 44, 44, 3, 5, 10);
    this.load.image('announcement-negative', 'assets/huomio_tausta.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
    window.scrollTo(10, 10);
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('backgroundselection');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  },
  addLoadingIndicator: function() {
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
  }
};

module.exports = Preload;
