
const SIZE=1000;
let OBJECTS=[];
let HAWKS =[];
let CLOUDS =[];

let SPEED=0.003;     //vaikuttaa miten useasti objektin sijainti paivittyy eli toisinsanoen kuinka nopeasti ikkunat tulee vastaan
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
let counter =0;
let doublepoints = false;
let old_score = true;
let remember_score =0;

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

const cloud_image = new Image();
cloud_image.src="GameImages/smoke.png"

const star_image = new Image();
star_image.src="GameImages/tahti.png"

let lightness = 80;



hamis_array = [];
hamis_array.push(hamis_1);
hamis_array.push(hamis_2);
hamis_array.push(hamis_3);
let doAnim = true;





function main(){

	var myMusic = document.getElementById("myAudio"); 
	var gameover = document.getElementById("game_over");
	gameover.style.display = "none";
	document.querySelector("#start_button").classList.toggle("hide"); 
	document.querySelector("#menu").classList.toggle("hide");
	myMusic.play();
	
	
	let canvas = document.getElementById("myCanvas")
  	let ctx=canvas.getContext("2d");
	//Reset 
	doAnim = true;
	rectX = 0.45;
	rectY = 0.9;
	OBJECTS = [];
	CLOUDS= [];
	SPEED=0.003; 
	score = 0;
	sky = 0.5;
	lightness = 80;
	counter=0;
	doublepoints = false;
	old_score = true;
	remember_score = 0;
	console.log(doublepoints);

	
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
		
		rectY -= 0.008;
	}
	if (40 in keys && keys[40] && rectY<0.935){ //down
		rectY += 0.008;
	}
	if (37 in keys && keys[37] && rectX>0.1199){ //left
		rectX -= 0.008;
	}
	if (39 in keys && keys[39] && rectX<0.815){ //right
		rectX += 0.008;
	}
}


//listeners
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);


function animate(){


	SPEED  += 0.0000008;
	if(doublepoints == true){
		score += 2
		if(old_score == true){ //2500 points is maximum 
			old_score = false;
			remember_score = score;		
			
		}

		if(score-remember_score == 2500){
			old_score = true;
			doublepoints =false		
		}
	}else{
		score += 1
	}

	counter +=1;
	sky += 0.0005;
	
	document.getElementById("score_amount").textContent =score;
	window_animate();
	if(counter >2000){
		lightness -= 0.01; //ehkä 0.015?
	}


	
	if(counter<3500){
		spawn_hawk();
	}

	if(counter>3500 && HAWKS.length != 0){ //preventing hawks to stop middle of the screen
		move_hawk();

	}


	if(3500 <counter && counter<7000){ //pilville 3500-7000
			spawn_cloud();
	}

	if(counter >3500 && CLOUDS.length != 0){ //preventing clouds to stop middle of the screen
		move_cloud();
	}

	if (!doAnim){
		ctx = null;
		return;
	}

	drawScene();
	window.requestAnimationFrame(animate);			//tällä loopataan vissiin animaatio
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
			//OBJECTS.push(new Windows(window_image,probabilityxaxis, -0.1));
			let spawn_probability = Math.random();
			if(spawn_probability<0.07){
				OBJECTS.push(new Windows(star_image,probabilityxaxis, -0.1,0.07,0.07));
				//console.log(OBJECTS[0].star_y_position);
				
			}else{
				OBJECTS.push(new Windows(window_image,probabilityxaxis, -0.1,0.15,0.09));		
			}

		}
	

	for(let i=0;i<OBJECTS.length;i++){
		OBJECTS[i].window_y_position+=SPEED;

		if(OBJECTS[i].window_image == window_image &&
			rectX + 0.04 >= OBJECTS[i].window_x_position /*LEFT_WINDOW*/ && 
			rectX <= OBJECTS[i].window_x_position+window_width-0.02 /*RIGHT_WINDOW*/ && 
			rectY + 0.05  >= OBJECTS[i].window_y_position /*TOP_WINDOW */&& 
			rectY<=OBJECTS[i].window_y_position+window_height -0.01 /*BOTTOM_WINDOW*/){
				
				var myMusic = document.getElementById("myAudio"); 
				var gameover2 = document.getElementById("game_over");
				document.getElementById("score_amount_total").textContent = score;
				if (gameover2.style.display === "none") {
					gameover2.style.display = "block";
				} else {
					gameover2.style.display = "none";
				}
				doAnim = false;
				document.querySelector("#start_button").classList.toggle("hide"); 
				document.querySelector("#menu").classList.toggle("hide");
				myMusic.pause();		
				
		}	
		

		if(OBJECTS[i].window_image == star_image &&
			rectX + 0.04 >= OBJECTS[i].window_x_position /*LEFT_WINDOW*/ && 
			rectX <= OBJECTS[i].window_x_position+window_width-0.1 /*RIGHT_WINDOW*/ && 
			rectY + 0.05  >= OBJECTS[i].window_y_position /*TOP_WINDOW */&& 
			rectY<=OBJECTS[i].window_y_position+window_height -0.04 /*BOTTOM_WINDOW*/){
				doublepoints=true;
				OBJECTS.splice(i,1);
			}
		
		if(OBJECTS[i].window_y_position>1){	
			OBJECTS.splice(i,1); // removing 1 element at index i
			
			i--;
		}
		
	}
}

function spawn_hawk(){
	
	let spawn_probability = Math.random();
	let spawn_height = (Math.floor(Math.random() * 6))/10;
	let left_or_right = Math.floor(Math.random() * 2);


	if(spawn_probability<0.004){
		if(left_or_right == 0){
			HAWKS.push(new hawk(hawk_image_left,-0.1,spawn_height));
		}
		else{
			HAWKS.push(new hawk(hawk_image_right,1.1,spawn_height));
		}
	}

	move_hawk();
}

function move_hawk(){
	let hawk_speed = 0.002;
	for(let i=0;i<HAWKS.length;i++){
		if(HAWKS[i].hawk_image == hawk_image_left){
			HAWKS[i].hawk_x_position+=hawk_speed;	
			HAWKS[i].hawk_y_position+=SPEED/2.5;
		}
		else{
			HAWKS[i].hawk_x_position-=hawk_speed;	
			HAWKS[i].hawk_y_position+=SPEED/2.5;
		}
		
		if(HAWKS[i].hawk_x_position< -0.4 ||HAWKS[i].hawk_x_position> 1.4){
			HAWKS.splice(i,1);  
		}
	}
}





function spawn_cloud(){
	let spawn_probability = Math.random();
	let spawn_height = (Math.random() * (0.3 - 0.0) + 0.0).toFixed(4)
	console.log(spawn_height);
	let spawn_width = Math.random();
	
	let left_or_right = Math.floor(Math.random() * 2);
	if(spawn_probability<0.003){
		if(left_or_right == 0){
			CLOUDS.push(new cloud(cloud_image,-0.1,spawn_height,0.13,0.13,"left"))
		}
		else{
			CLOUDS.push(new cloud(cloud_image,1.1,spawn_height,0.13,0.13,"right"))
		}
	}
		move_cloud();

}

function move_cloud(){
	let cloud_speed = 0.001;
	for(let i=0;i<CLOUDS.length;i++){
		if(CLOUDS[i].cloud_id == "left"){
			CLOUDS[i].cloud_x_position+=cloud_speed;
			
		}
		else{
			CLOUDS[i].cloud_x_position-=cloud_speed;	
		}

		if(CLOUDS[i].cloud_x_position< -0.4 ||CLOUDS[i].cloud_x_position> 1.4){
			CLOUDS.splice(i,1);  
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

	//let ses = (new cloud(cloud_image,0.05,0.1,0.2,0.2));
	//ses.draw(ctx);

	
		for(let i=0;i<OBJECTS.length;i++){
    		OBJECTS[i].draw(ctx);
			//console.log(OBJECTS);
    	}
			
		for(let i=0;i<CLOUDS.length;i++){
			//if(!CLOUDS[i] == null){
    		CLOUDS[i].draw(ctx);
			//console.log(OBJECTS);
			//}
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

class Windows{
	constructor(window_image,window_x_position, window_y_position,window_width,window_height){
		this.window_x_position=window_x_position;
		this.window_y_position=window_y_position;
		this.window_image=window_image;
		this.window_width=window_width;
		this.window_height = window_height;
		
		

	}
	draw(ctx){
		ctx.drawImage(this.window_image,this.window_x_position,this.window_y_position,this.window_width,this.window_height)
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

class cloud{
	constructor(cloud_image,cloud_x_position, cloud_y_position,cloud_x_size,cloud_y_size,cloud_id){
		this.cloud_image = cloud_image;
		this.cloud_x_position= cloud_x_position;
		this.cloud_y_position = cloud_y_position;
		this.cloud_x_size = cloud_x_size;
		this.cloud_y_size = cloud_y_size;
		this.cloud_id = cloud_id;
	}
	draw(ctx){
		ctx.drawImage(this.cloud_image,this.cloud_x_position,this.cloud_y_position,this.cloud_x_size,this.cloud_y_size)
	}
}


class star{
	constructor(star_image,star_x_position, star_y_position){
		this.star_x_position=star_x_position;
		this.star_y_position=star_y_position;
		this.star_image = star_image;
	}
	draw(ctx){
		ctx.drawImage(this.star_image,this.star_x_position, this.star_y_position, 0.06, 0.06)
	}
}

main();
