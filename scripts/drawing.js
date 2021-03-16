function drawScene(){
	let canvas = document.getElementById("myCanvas")
	let ctx=canvas.getContext("2d");
	drawBackground(ctx,sky);
	spider(ctx);
	
		for(let i=0;i<OBJECTS.length;i++){
    		OBJECTS[i].draw(ctx);
			
    	}
			
		for(let i=0;i<CLOUDS.length;i++){
			
    		CLOUDS[i].draw(ctx);
	
    	}


    }

function drawBackground(ctx,sky){

	
	ctx.beginPath();			//vihreän maan luonti
	ctx.fillStyle="green";
	ctx.rect(0,0.5,1,0.5);
    ctx.fill();
	

	ctx.beginPath();				//taivaan luonti
	ctx.fillStyle=	"hsl(195, 100%, "+ lightness+ "%)";
	ctx.rect(0,0,1,sky);
	ctx.fill();

	for(let i=0;i<HAWKS.length;i++){
		HAWKS[i].draw(ctx);
	}

    ctx.beginPath();			//tässä luodaan "tausta" talon ruskehtava runko joka ei siis liiku
    ctx.lineWidth=0.01;
    ctx.fillStyle="BurlyWood";
    ctx.rect(0.12,-0.1,0.75,1.2);
    ctx.stroke();
    ctx.fill();

}