
const SIZE=1000;
let OBJECTS=[];
let HAWKS =[];

let SPEED=0.0004;     //vaikuttaa miten useasti objektin sijainti paivittyy eli toisinsanoen kuinka nopeasti ikkunat tulee vastaan
let rectX = 0.45;
let rectY = 0.9;


let window_x_position = 0.45;
let window_y_position= 0.5
let window_width = 0.15
let window_height = 0.09

let hawk_x_position = 0;
let hawk_y_position =0;

let score = 0;
let sky = 0.5;
const hamis_1 = new Image();
hamis_1.src = "SpiderImages/hamis1.png";

const hamis_2 = new Image();
hamis_2.src = "SpiderImages/hamis2.png";

const hamis_3 = new Image();
hamis_3.src = "SpiderImages/hamis3.png";

const hawk_image_left = new Image();
hawk_image_left.src ="HawkImages/haukka.png"

const hawk_image_right = new Image();
hawk_image_right.src ="HawkImages/haukkareverse.png"

const rock = new Image();
rock.src ="RockImages/rock.png"

const window_image = new Image();
window_image.src="GameImages/ikkuna_game.png"

let lightness = 80;



hamis_array = [];
hamis_array.push(hamis_1);
hamis_array.push(hamis_2);
hamis_array.push(hamis_3);
let doAnim = true;


var Music;



function main(){

	var gameover = document.getElementById("game_over");
	gameover.style.display = "none";
	document.querySelector("#start_button").classList.toggle("hide"); 
	document.querySelector("#menu").classList.toggle("hide");
	
	
	let canvas = document.getElementById("myCanvas")
  	let ctx=canvas.getContext("2d");

	Music = new sound("");

	
	//Reset 
	doAnim = true;
	rectX = 0.45;
	rectY = 0.9;
	OBJECTS = [];
	SPEED=0.0004; 
	score = 0;
	sky = 0.5;
	lightness = 80;

	
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

function spider(ctx) {
	move(); //movement
	x = Math.floor(Math.random() * 3); 
    ctx.drawImage(hamis_array[x],rectX,rectY, 0.06, 0.06); //arvotaan joku hämis kuvista
}
/*
function hawk(ctx){
	ctx.drawImage(hawk_image, 0.8, 0.8, 0.06, 0.06)
}
*/


//key management
var keys = new Array();

function keyDown(e){
	keys[e.keyCode] = true;
}
function keyUp(e){
	keys[e.keyCode] = false;
}
function move(){
	
	if (38 in keys && keys[38] && rectY>0.022){ //up
		
		rectY -= 0.01;
	}
	if (40 in keys && keys[40] && rectY<0.935){ //down
		rectY += 0.01;
	}
	if (37 in keys && keys[37] && rectX>0.134999998){ //left
		rectX -= 0.01;
	}
	if (39 in keys && keys[39] && rectX<0.815){ //right
		rectX += 0.01;
	}
}


//listeners
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);


function animate(){

	SPEED  += 0.0000005;
	score += 1
	sky += 0.0001;
	
	
	document.getElementById("score_amount").textContent =score;
	hawk_animate();
	window_animate();

	if(score >5000){
		lightness -= 0.01;
	}

	if (!doAnim){
		ctx = null;
		return;
	}

	drawScene();
	window.requestAnimationFrame(animate);			//tällä loopataan vissiin animaatio

	Music.play();
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
	  this.sound.play();
	}
	this.stop = function(){
	  this.sound.pause();
	}
  }

function hawk_animate(){
	
	let spawn_probability = Math.random();
	let hawk_speed = 0.002;
	let spawn_height = (Math.floor(Math.random() * 6))/10;
	let left_or_right = Math.floor(Math.random() * 2);


	if(spawn_probability<0.0008){
		if(left_or_right == 0){
			HAWKS.push(new hawk(hawk_image_left,-0.1,spawn_height));
		}
		else{
			HAWKS.push(new hawk(hawk_image_right,1.1,spawn_height));
		}
	}

	for(let i=0;i<HAWKS.length;i++){
		if(HAWKS[i].hawk_image == hawk_image_left){
			HAWKS[i].hawk_x_position+=hawk_speed;	
			HAWKS[i].hawk_y_position+=SPEED;
		}
		else{
			HAWKS[i].hawk_x_position-=hawk_speed;	
			HAWKS[i].hawk_y_position+=SPEED;
		}
		
		if(HAWKS[i].hawk_x_position< -0.4 ||HAWKS[i].hawk_x_position> 1.4){
			HAWKS.splice(i,1);  
		}
	}

}

function window_animate(){

	let probabilityxaxis = Math.random() * (0.719 - 0.131) +0.118; // arpoo ikkunan ruutuun
	
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
			OBJECTS.push(new Windows(window_image,probabilityxaxis, -0.1));
		}
	
	
	for(let i=0;i<OBJECTS.length;i++){
		OBJECTS[i].window_y_position+=SPEED;
		
		if(rectX + 0.04 >= OBJECTS[i].window_x_position /*LEFT_WINDOW*/ && 
			rectX <= OBJECTS[i].window_x_position+window_width-0.02 /*RIGHT_WINDOW*/ && 
			rectY + 0.05  >= OBJECTS[i].window_y_position /*TOP_WINDOW */&& 
			rectY<=OBJECTS[i].window_y_position+window_height -0.01 /*BOTTOM_WINDOW*/){
				var gameover2 = document.getElementById("game_over");
				if (gameover2.style.display === "none") {
					gameover2.style.display = "block";
				} else {
					gameover2.style.display = "none";
				}
				doAnim = false;
				document.querySelector("#start_button").classList.toggle("hide"); 
				document.querySelector("#menu").classList.toggle("hide");
				
				
		}	
		
		if(OBJECTS[i].window_y_position>1){	//object hävitetään taulukosta kun pysty muuttuja eli location[1] menee suuremmaksi kuin 2.375 eli pois näkymästä (en tiedä vaikuttaako selaimen skaalaus tms tähän valueen, en usko koska suhteellisia arvoja?)
			OBJECTS.splice(i,1); // removing 1 element at index i
			//console.log("------------ OBJECTS taulukosta poistettu alkio  -------------");
			i--;
		}
		
	}
	

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
	drawBackground(ctx,sky);
	spider(ctx);
	
	
	
		for(let i=0;i<OBJECTS.length;i++){
    		OBJECTS[i].draw(ctx);
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


function getRandomColor(){
	let red=Math.floor(Math.random()*255);
	let green=Math.floor(Math.random()*255);
	let blue=Math.floor(Math.random()*255);
	return "rgba("+red+","+green+","+blue+",1)";
}



class Windows{
	constructor(window_image,window_x_position, window_y_position){
		this.window_x_position=window_x_position;
		this.window_y_position=window_y_position;
		this.window_image=window_image;
		
		

	}
	draw(ctx){
		/*
		ctx.beginPath();
		ctx.lineWidth=0.02;
		ctx.fillStyle="lightblue";
		ctx.rect(this.window_x_position,this.window_y_position,window_width,window_height);
		ctx.stroke();
		ctx.fill();
		*/
		ctx.drawImage(this.window_image,this.window_x_position,this.window_y_position,window_width,window_height)
		}
}

class hawk{
	constructor(hawk_image,hawk_x_position, hawk_y_position){
		this.hawk_x_position=hawk_x_position;
		this.hawk_y_position=hawk_y_position;
		this.hawk_image = hawk_image;
	}
	draw(ctx){
		ctx.drawImage(this.hawk_image,this.hawk_x_position, this.hawk_y_position, 0.06, 0.06)
	}
}


main();
