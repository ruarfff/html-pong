ig.module(
	'game.entities.paddle-cpu'
)
.requires(
	'game.entities.paddle',
	'game.entities.puck'
	
)
.defines(function(){

EntityPaddleCpu = EntityPaddle.extend({
	lives: 3,
	update: function() {
		
		var puck = ig.game.getEntitiesByType( EntityPuck )[0];
		
		if( puck.pos.x + puck.size.x/2 > this.pos.x + this.size.x/2 ) {
			this.vel.x = 75;
		}
		else {
			this.vel.x = -75;
		}
		
		this.parent();
		
	}
});

});