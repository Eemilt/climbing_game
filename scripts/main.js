
const SIZE=1000;
let OBJECTS=[];
let HAWKS =[];
let CLOUDS =[];

let SPEED=0.003;     //vaikuttaa miten useasti objektin sijainti paivittyy eli toisinsanoen kuinka nopeasti ikkunat tulee vastaan
let rectX = 0.45;
let rectY = 0.9;


let gameObject_x_position = 0.45;
let gameObject_y_position= 0.5
let gameObject_width = 0.15
let gameObject_height = 0.09

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
	myMusic.load();
	myMusic.play();
	myMusic.volume = 0.6;
	
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
	

	
	canvas.width=SIZE;
	canvas.height=SIZE;

	ctx.scale(SIZE,SIZE);
    drawScene();
	animate();


}


function animate(){

	var myMusic = document.getElementById("myAudio");
	SPEED  += 0.0000008;
	counter +=1;
	sky += 0.0005;
	document.getElementById("score_amount").textContent =score;


	gameObjects_animate();
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

	if(doublepoints == true){
		score += 2
		if(old_score == true){ //2500 points is maximum 
			old_score = false;
			remember_score = score;		
			
		}

		if(score-remember_score == 2500){
			old_score = true;
			doublepoints = false;
			myMusic.playbackRate=1.0;
		}
	}else{
		score += 1
	}


	if (!doAnim){
		ctx = null;
		return;
	}

	drawScene();
	window.requestAnimationFrame(animate);			//tällä loopataan vissiin animaatio
}


function mute() {

	var myMusic = document.getElementById("myAudio");
	var effect1 = document.getElementById("tahtiAudio");
	var effect2 = document.getElementById("hitAudio");
	var effect3 = document.getElementById("gameoverAudio");
	var muteButton = document.getElementById("mute_button");

	if (myMusic.muted) {
		myMusic.muted = false;
		effect1.muted = false;
		effect2.muted = false;
		effect3.muted = false;
		muteButton.innerHTML = "Mute";
	} else {
		myMusic.muted = true;
		effect1.muted = true;
		effect2.muted = true;
		effect3.muted = true;
		muteButton.innerHTML = "Unmute";

	}
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
  



class GameObjects{
	constructor(gameObject_image,gameObject_x_position, gameObject_y_position,gameObject_width,gameObject_height){
		this.gameObject_x_position=gameObject_x_position;
		this.gameObject_y_position=gameObject_y_position;
		this.gameObject_image=gameObject_image;
		this.gameObject_width=gameObject_width;
		this.gameObject_height = gameObject_height;
		
		

	}
	draw(ctx){
		ctx.drawImage(this.gameObject_image,this.gameObject_x_position,this.gameObject_y_position,this.gameObject_width,this.gameObject_height)
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
