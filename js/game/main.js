ig.module('game.main').requires('impact.game', 'impact.font', 'game.entities.htmlbutton', 'game.entities.puck', 'game.entities.paddle-cpu', 'game.entities.paddle-player', 'game.levels.android1', 'game.levels.android2', 'game.levels.android3', 'game.levels.android4').defines(function () {
    var screenheight = ig.ua.screen.height;
    var screenWidth = ig.ua.screen.width;
    currentLevel = 'level1';
    paused = false;
    method = '';
    Pong = ig.Game.extend({
        player: null,
        cpu: null,
        puck: null,
        cpuLives: 3,
        playerLives: 3,
        pausing: false,

        gameWon: function () {
            currentLevel = 'level1';
            method = 'resetLevel';
            pop('You Win the Game!', 'Restart', this.exitGame, 'Exit');
        },
        reloadLevel: function () {
            try {
                this.puck = this.getEntitiesByType(EntityPuck)[0];
                this.player = this.getEntitiesByType(EntityPaddlePlayer)[0];
                this.cpu = this.getEntitiesByType(EntityPaddleCpu)[0];
                if (currentLevel === 'level1') {
                    ig.game.loadLevel(LevelAndroid1);
                } else if (currentLevel === 'level2') {
                    ig.game.loadLevel(LevelAndroid2);
                } else if (currentLevel === 'level3') {
                    ig.game.loadLevel(LevelAndroid3);
                } else if (currentLevel === 'level4') {
                    ig.game.loadLevel(LevelAndroid4);
                }
                paused = false;
            } catch (error) {
                console.log(error.toString());
            }
        },
        exitGame: function () {
            hidepop();
			window.reload();
        },
        resetLevel: function () {
            try {
                this.cpuLives = 3;
                this.playerLives = 3;

                this.reloadLevel();
            } catch (error) {
                console.log(error.toString());
            }
        },
        goToNextLevel: function () {
            try {
                if (currentLevel === 'level1') {
                    currentLevel = 'level2';
                } else if (currentLevel === 'level2') {
                    currentLevel = 'level3';
                } else if (currentLevel === 'level3') {
                    currentLevel = 'level4';
                } else if (currentLevel === 'level4') {
                    this.gameWon();
                }
                this.resetLevel();
            } catch (error) {
                console.log(error.toString());
            }
        },
        // Load a font
        font: new ig.Font('media/04b03.font.png'),

        init: function () {
            ig.input.bindTouch('#buttonLeft', 'leftbtndown', 'leftbtnup', 'leftbtnclick');
            ig.input.bindTouch('#buttonRight', 'rightbtndown', 'rightbtnup', 'rightbtnclick');
            console.log('init called');
            this.resetLevel();
        },
        loadLevel: function (level) {
            this.parent(level);
            // Enable the pre-rendered background mode for all
            // mobile devices
            if (ig.ua.mobile) {
                for (var i = 0; i < this.backgroundMaps.length; i++) {
                    this.backgroundMaps[i].preRender = true;
                }
            }
        },
        update: function () {
            if (!paused) {
                // Update all entities and backgroundMaps
                this.parent();
                if (this.puck.pos.y < 0) {
                    this.puck.pos.x = screenWidth / 2;
                    this.puck.pos.y = screenheight / 2;
                    this.cpuLives -= 1;
                    this.reloadLevel();

                } else if (this.puck.pos.y > 440) {
                    this.puck.pos.x = screenWidth / 2;
                    this.puck.pos.y = screenheight / 2;
                    this.playerLives -= 1;
                    this.reloadLevel();
                }

                if (this.cpuLives <= 0) {
                    paused = true;

                    method = 'goToNextLevel';
                    pop('You Win', 'Continue', this.exitGame, 'Exit');


                } else if (this.playerLives <= 0) {
                    paused = true;

                    method = 'resetLevel';
                    pop('You lose', 'Retry', this.exitGame, 'Exit');

                }
                ig.$("#playerLives").innerHTML = "Player: " + this.playerLives;
                ig.$("#cpuLives").innerHTML = "CPU: " + this.cpuLives;
            } else {
            }

        },
        draw: function () {
            // Draw all entities and backgroundMaps
            this.parent();
        }
    });
    if (ig.ua.mobile) {
        // Disable sound for all mobile devices
        ig.Sound.enabled = false;
    }
    MyLoader = ig.Loader.extend({

        draw: function () {
            // Add your drawing code here

            // This one clears the screen and draws the
            // percentage loaded as text
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
            ig.system.context.fillStyle = '#000000';
            ig.system.context.fillRect(0, 0, w, h);

            var percentage = (this.status * 100).round() + '%';
            ig.system.context.fillStyle = '#ffffff';
            ig.system.context.fillText(percentage, w / 2, h / 2);
        }
    });

    function startGame() {
        if (ig.ua.iPhone4) {
            ig.main('#canvas', Pong, 60, 320, 440, 2);
        } else {
            ig.main('#canvas', Pong, 60, 320, 440, 1);
        }
    }

    startGame();

});
