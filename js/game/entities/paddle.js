ig.module(
	'game.entities.paddle'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPaddle = ig.Entity.extend({
	
	size: {x:40, y:20},
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/paddle-red.png', 40, 20 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	}
});

});