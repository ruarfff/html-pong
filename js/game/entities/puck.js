ig.module(
	'game.entities.puck'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPuck = ig.Entity.extend({
	
	size: {x:20, y:20},
	collides: ig.Entity.COLLIDES.ACTIVE,
	
	animSheet: new ig.AnimationSheet( 'media/puck.png', 20, 20 ),
	
	
	
	bounciness: 1,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0,1,2,3,4,4,4,4,3,2,1] );
		this.vel.x = -600;
		this.vel.y = 300;
		this.accel.x = 1.5;
		this.accel.y = 1.5;
		
		ig.game.puck = this;
	}
});

});