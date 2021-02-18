/*
Few changes from in-class:
- remove the sine function for movement speed
- stretched canvas to full screen in CSS
- other small changes in CSS
- removed the first 3 houses which were hard-coded there
*/
const SIZE=1000;
const OBJECTS=[];
let SPEED=0.001;     //vaikuttaa miten useasti objektin sijainti paivittyy eli toisinsanoen kuinka nopeasti ikkunat tulee vastaan
var rectX = 0.45;
var rectY = 0.9;

function main(){
	let canvas = document.getElementById("myCanvas")
  	let ctx=canvas.getContext("2d");
	
	canvas.width=SIZE;
	canvas.height=SIZE;
	
	ctx.scale(SIZE,SIZE);
	//trick to see outside the canvas
	//ctx.scale(SIZE*0.5,SIZE*0.5);
	//ctx.translate(0.5,0.5);
	
    drawScene();
	animate();
	
	//setInterval(animate,100); // every 100 ms, 10 frames per second
	//setTimeout();// try this if interested
	
}



function rect(ctx) {
	ctx.beginPath();
    ctx.lineWidth=0.01;
    ctx.fillStyle="red";
    ctx.rect(rectX,rectY,0.05,0.05);
    ctx.stroke();
    ctx.fill();
}



window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
 
var keys = [];
function keysPressed(e) {
	
    // store an entry for every key pressed
    keys[e.keyCode] = true;
 
    // left
    if (keys[37] && rectX>0.134999998) {
      rectX -= 0.035;
    }
 
    // right
    if (keys[39] && rectX<0.815) {
      rectX += 0.035;
    }
 
    // up
    if (keys[38] && rectY>0.022) {
      rectY -= 0.035;
    }
 
    // down
    if (keys[40] && rectY<0.935) {
      rectY += 0.035;
    }
 
    e.preventDefault();
 
	//window.requestAnimationFrame(keysPressed);

	
    drawScene();
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}


/*
function onkeydown(e) {
  
    if (e.keyCode == 39 && rectX<0.815) { 
      rectX = rectX+ 0.035;
      RIGHT = true;
    } //right arrow
    else if (e.keyCode == 37 && rectX>0.134999998) {
		  rectX = rectX-0.035;
      LEFT = true;
    } //left arrow
    else if (e.keyCode == 38 && rectY>0.022) {
        rectY = rectY - 0.035;
      UP = true;
    } //up arrow
    else if (e.keyCode == 40 && rectY<0.935) {
        rectY = rectY + 0.035;
      DOWN = true;
	} //down arrow
	console.log(" X arvo on:   "+rectX+" Y arvo on:  "+ rectY)
	drawScene();
}*/



//window.addEventListener("keydown", onkeydown);

////////////////////////////////////////////////

function animate(){
	SPEED  += 0.0000002;
  
  // add objects to scene
	let probability=Math.random(); //[0..1)		//spawnauksen sijaintitodennäköisyys
	let probabilityxaxis = Math.random() //spawnattujen laatikoiden sivuittaissijainti
 
    if(probability>0.0){ // probability to generate SOME object, tällä hetkellä spawnataan niin usein kun pystyy ja rajoitetaan vain sillä ettei ikkunat saa tulla liian lähekkäin. Toisin sanoen ikkunoiden väli on koko ajan sama "sallitturaja" muuttuesta riippuen
		properties={
		levels:1,
		wallColor:"Brown",
		roofColor:"BurlyWood"
      }
        
		let y=1; // between 0.5 and 1;
		let size=(y*y/2)*0.5;
		let sallitturaja = 1.4		//määrittää minkä korkeus arvon jälkeen uusi ikkuna saa spawnata
		let mahtuuko = false;  		//tämä pistetään trueksi jos canvakseen mahtuu uusi ikkuna

		if(OBJECTS.length>0){		//ehdotetaan että spawnaa ainakin jotain jos yhtään ikkunaa ei olekkaan liikenteessä else haarassa
			//(OBJECTS[OBJECTS.length-1].location[1])
			if(OBJECTS[OBJECTS.length-1].location[1]>sallitturaja){		//taulukon vika alkio on aina näemmä "ylin" ja sen korkeuden tarkastelu riittää päättämään voiko uuden ikkunan asettaa
				mahtuuko= true;
			}
		}else{
			mahtuuko=true;
		}
			
		if(mahtuuko == true){		//tällä saa spawnattua vain yhden laatikon kerrallaan canvakseen
			OBJECTS.push(new Windows([(probabilityxaxis*(0.75-0.22)+0.22)+size*0.5,y], size, properties));	
		}

		
	}
	

    //console.log(" OBJECTS taulukon pituus on: "+OBJECTS.length);

    
	
	// move objects in scene
	for(let i=0;i<OBJECTS.length;i++){
		OBJECTS[i].location[1]+=SPEED;
		//console.log(i + " " + OBJECTS[i].location[0] +"taalla" + "rectX " + rectX);
		//console.log(distance(OBJECTS[0].location[0],OBJECTS[0].location[1],rectX,rectY));

		
		//console.log(" location 1 arvo on " + OBJECTS[i].location[1]+" ja raja arvo on " + OBJECTS[i].scale*9.5); 	// tän avulla saa tausta väärin skaletettuna testailtua millon pitäs turhien "ikkunoiden" kadota
		//console.log("arvon 0 sijainti on: " + OBJECTS[i].location[0] + " ja arvon 1 sijainti on: "+ OBJECTS[i].location[1])
		if(OBJECTS[i].location[1]>OBJECTS[i].scale*9.5){				//object hävitetään taulukosta kun pysty muuttuja eli location[1] menee suuremmaksi kuin 2.375 eli pois näkymästä (en tiedä vaikuttaako selaimen skaalaus tms tähän valueen, en usko koska suhteellisia arvoja?)
			OBJECTS.splice(i,1); // removing 1 element at index i
			console.log("------------ OBJECTS taulukosta poistettu alkio  -------------");
			i--;
		}
	}
    

  // sort to draw smaller objects first
	OBJECTS.sort(function(a,b){
		return a.scale-b.scale;
	});
	
	drawScene();
	window.requestAnimationFrame(animate);			//tällä loopataan vissiin animaatio
}

function checkrepeat (){		//opelta jääny, en tiedä mitä tää tekee


}

function distance(ikkuna_x, ikkuna_y, laatikko_x,laatikko_y ){
	let x_etaisyys= laatikko_x-ikkuna_x;
	let y_etaisyys = laatikko_y-ikkuna_y;

	return Math.sqrt(Math.pow(x_etaisyys,2) + Math.pow(y_etaisyys,2)) //Pythagoras
}

function drawScene(){
	
	let canvas = document.getElementById("myCanvas")
	let ctx=canvas.getContext("2d");
	
	drawBackground(ctx);
	rect(ctx);
		for(let i=0;i<OBJECTS.length;i++){
    		OBJECTS[i].draw(ctx);
    	}
    }

function drawBackground(ctx){
	ctx.beginPath();				//taivaan luonti
	ctx.fillStyle="lightblue";
	ctx.rect(0,0,1,0.5);
	ctx.fill();
	
	ctx.beginPath();			//vihreän maan luonti
	ctx.fillStyle="green";
	ctx.rect(0,0.5,1,0.5);
    ctx.fill();

    ctx.beginPath();			//tässä luodaan "tausta" talon ruskehtava runko joka ei siis liiku
    ctx.lineWidth=0.01;
    ctx.fillStyle="BurlyWood";
    ctx.rect(0.12,-0.1,0.75,1.2);
    ctx.stroke();
    ctx.fill();
    
}


function getRandomColor(){
	let red=Math.floor(Math.random()*255);
	let green=Math.floor(Math.random()*255);
	let blue=Math.floor(Math.random()*255);
	return "rgba("+red+","+green+","+blue+",1)";
}

class Windows{
	constructor(loc, scale, properties){
		this.location=loc;
		this.scale=scale;
		this.properties=properties;
		this.angles=[];
		for(let i=1;i<=this.properties.levels;i++){
			//this.angles[i]=(Math.random()-0.5)*0.2; // in radians
			// 360 degrees is 2 PI radians
		}
	}
	draw(ctx){
		ctx.beginPath();
	
		ctx.save();
		ctx.translate(this.location[0],this.location[1]);
		ctx.scale(this.scale,this.scale);
		ctx.lineWidth=0.08;
		
		ctx.fillStyle="lightblue";		//ikkunan väri, tähän vois kokeilla saada vaikka jollain liukuvärjäyksellä lisää eloa. "kukkalauta" voisi olla tehtävissä lisäämällä ikkunan alaosaan esimerkiksi paksun viivan 		
		ctx.beginPath();
        ctx.rect(-0.9,-4.7,0.8,0.5);
		ctx.stroke();
		ctx.fill();
		ctx.translate(0,-0.1);
		ctx.restore();
		
	}
}


class Tree{					//tällä voisi spawnata satunnaisesti vaikka kiviä tms, atm turha/ei käytössä
	constructor(loc, scale){
		this.location=loc;
		this.scale=scale;
	}
	draw(ctx){
		ctx.beginPath();
	
		ctx.save();
		ctx.translate(this.location[0],this.location[1]);
		ctx.scale(this.scale,this.scale);
		ctx.lineWidth=0.04;
		
		ctx.fillStyle="brown";
		
		//trunk
		ctx.beginPath();
		ctx.rect(-0.02,-0.1,0.04,0.1);
		ctx.stroke();
		ctx.fill();
		
		ctx.translate(0,-0.1);
		
		ctx.fillStyle="rgba(0,255,0,1)";
		ctx.beginPath();
		ctx.moveTo(-0.2,-0.0);
		ctx.lineTo(+0.2,-0.0);
		ctx.lineTo(+0.0,-0.9);
		ctx.lineTo(-0.2,-0.0);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.restore();
	}
}



main();
