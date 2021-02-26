
const SIZE=1000;
const OBJECTS=[];

let SPEED=0.000001;     //vaikuttaa miten useasti objektin sijainti paivittyy eli toisinsanoen kuinka nopeasti ikkunat tulee vastaan
var rectX = 0.45;
var rectY = 0.9;



var window_x_position = 0.45;
var window_y_position= 0.5
var window_width = 0.15
var window_height = 0.09


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




var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;


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
	} //down arrow*/

	drawScene();
}



window.addEventListener("keydown", onkeydown);

function animate(){
	SPEED  += 0.0000002;
	
	let probabilityxaxis = Math.random() * (0.708 - 0.131) +0.131; // arpoo ikkunan ruutuun

	properties={
		levels:1,
		wallColor:"Brown",
		roofColor:"BurlyWood"
      }
	  
		let sallitturaja = 0.15		//määrittää minkä korkeus arvon jälkeen uusi ikkuna saa spawnata, käytännössä ikkunoiden väli 
		let mahtuuko = false;  		//tämä pistetään trueksi jos canvakseen mahtuu uusi ikkuna
		if(OBJECTS.length>0){		//ehdotetaan että spawnaa ainakin jotain jos yhtään ikkunaa ei olekkaan liikenteessä else haarassa
			//(OBJECTS[OBJECTS.length-1].location[1])
			if(OBJECTS[OBJECTS.length-1].window_y_position>sallitturaja){		//taulukon vika alkio on aina näemmä "ylin" ja sen korkeuden tarkastelu riittää päättämään voiko uuden ikkunan asettaa
				mahtuuko= true;
			}
		}else{
			mahtuuko=true;
		}
			
		if(mahtuuko == true){		//tällä saa spawnattua vain yhden laatikon kerrallaan canvakseen
			OBJECTS.push(new Windows(probabilityxaxis, -0.1, properties));
		}
	
	for(let i=0;i<OBJECTS.length;i++){
		OBJECTS[i].window_y_position+=SPEED;

			if(rectX + 0.05 +0.01 >= OBJECTS[i].window_x_position && rectX <= OBJECTS[i].window_x_position+window_width +0.01 && rectY + 0.05 +0.01  >= OBJECTS[i].window_y_position && rectY<=OBJECTS[i].window_y_position+window_height +0.01){
					console.log("OSU PERK*LE!")
			}
		
		if(OBJECTS[i].window_y_position>1){	//object hävitetään taulukosta kun pysty muuttuja eli location[1] menee suuremmaksi kuin 2.375 eli pois näkymästä (en tiedä vaikuttaako selaimen skaalaus tms tähän valueen, en usko koska suhteellisia arvoja?)
			OBJECTS.splice(i,1); // removing 1 element at index i
			/*console.log("------------ OBJECTS taulukosta poistettu alkio  -------------");*/
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

/* PYTHAGORAN voiaan kattoo esim ympyräobjektien etäisyyksiä

function distance(item1_x, item1_y, item2_x,item2_y ){
	let x_etaisyys= item2_x-item1_x;
	let y_etaisyys = item2_y-item1_y;

	return Math.sqrt(Math.pow(x_etaisyys,2) + Math.pow(y_etaisyys,2)) //Pythagoras
}
*/

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
	constructor(window_x_position, window_y_position, properties){
		this.window_x_position=window_x_position;
		this.window_y_position=window_y_position;
		this.properties=properties;
		this.angles=[];
		for(let i=1;i<=this.properties.levels;i++){
			//this.angles[i]=(Math.random()-0.5)*0.2; // in radians
			// 360 degrees is 2 PI radians
		}
	}
	draw(ctx){
	ctx.beginPath();
	ctx.lineWidth=0.02;
	ctx.fillStyle="lightblue";
	ctx.rect(this.window_x_position,this.window_y_position,window_width,window_height);
	ctx.stroke();
	ctx.fill();
		
	}
}



main();
