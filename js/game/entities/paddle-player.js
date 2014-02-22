ig.module(
	'game.entities.paddle-player'
)
.requires(
	'game.entities.paddle'
)
.defines(function(){

EntityPaddlePlayer = EntityPaddle.extend({
	lives: 3,
	animSheet: new ig.AnimationSheet( 'media/paddle-blue.png', 40, 20 ),
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
			ig.game.player = this;
	},

	update: function() {
		
		if( ig.input.pressed('leftbtndown') ) {
			this.vel.x = -100;
		}
		else if( ig.input.pressed('rightbtndown') ) {
			this.vel.x = 100;
		}
		
		if((ig.input.pressed('leftbtnup')) || (ig.input.pressed('rightbtnup'))) {
		    this.vel.x = 0;
		}
		
		if((ig.input.pressed('leftbtnclick')) || (ig.input.pressed('rightbtnclick'))) {
			console.log("Clicked"); 
		}
		
		this.parent();
	}
});

});