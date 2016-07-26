var Phaser = require('phaser');
var WebFont = require('webfontloader');

var rb = null;

var bootState = {
    init: function(rockBottomState) {
        rb = rockBottomState;
        this.stage.backgroundColor = '#EDEEC9'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)

        this.game.add.plugin(Phaser.Plugin.Debug);
    },
    preload: function() {
        WebFont.load({
          google: {
            families: ['Nunito']
          },
          active: this.fontsLoaded
      });

        var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
        text.anchor.setTo(0.5, 0.5);

        this.load.image('loaderBg', './assets/images/loader-bg.png');
        this.load.image('loaderBar', './assets/images/loader-bar.png');

        //resize when window size changes
        window.addEventListener('resize', function() {
            var height = window.innerHeight;
            var width = window.innerWidth;

            this.game.height = height;
            this.game.width = width;

            this.game.stage.getBounds().height = height;
            this.game.stage.getBounds().width = width;

            if(this.game.renderType === Phaser.WEBGL) {
                //this.game.renderer.resize(width, height);
            }

            //scaleWorld();
        }.bind(this));

        var scaleWorld = function() {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            //this.game.scale.maxWidth = 1024;
            //this.game.scale.maxHeight = 768;
            //this.game.scale.forceLandscape = true;
            this.game.scale.pageAlignHorizontally = true;
            this.stage.scale.pageAlignVertically = true;
        }.bind(this);

        scaleWorld();
    },
    render: function() {
        if (this.fontsReady) {
          this.state.start('Splash', true,false, rb);
        }
    },
    fontsLoaded: function() {
        this.fontsReady = true;
    }
};

module.exports = bootState;
