//key management
var keys = new Array();

function keyDown(e){
	keys[e.keyCode] = true;
}
function keyUp(e){
	keys[e.keyCode] = false;
}



//listeners
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);

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


function move_gameObjects(){

	for(let i=0;i<OBJECTS.length;i++){
		OBJECTS[i].gameObject_y_position+=SPEED;

		if(OBJECTS[i].gameObject_image == window_image &&
			rectX + 0.04 >= OBJECTS[i].gameObject_x_position /*LEFT_WINDOW*/ && 
			rectX <= OBJECTS[i].gameObject_x_position+gameObject_width-0.02 /*RIGHT_WINDOW*/ && 
			rectY + 0.05  >= OBJECTS[i].gameObject_y_position /*TOP_WINDOW */&& 
			rectY<=OBJECTS[i].gameObject_y_position+gameObject_height -0.01 /*BOTTOM_WINDOW*/){
				var kuolemaAani = document.getElementById("hitAudio");
				var gameoverAani = document.getElementById("gameoverAudio");  
				gameoverAani.playbackRate=0.7;
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
				kuolemaAani.play();
				gameoverAani.play();
				myMusic.pause();		
				
		}	
		

		if(OBJECTS[i].gameObject_image == star_image &&
			rectX + 0.04 >= OBJECTS[i].gameObject_x_position /*LEFT_WINDOW*/ && 
			rectX <= OBJECTS[i].gameObject_x_position+gameObject_width-0.1 /*RIGHT_WINDOW*/ && 
			rectY + 0.05  >= OBJECTS[i].gameObject_y_position /*TOP_WINDOW */&& 
			rectY<=OBJECTS[i].gameObject_y_position+gameObject_height -0.04 /*BOTTOM_WINDOW*/){
				var osumaAani = document.getElementById("tahtiAudio"); 
				var myMusic = document.getElementById("myAudio");
				osumaAani.play();
				myMusic.playbackRate=1.5;
				doublepoints=true;
				OBJECTS.splice(i,1);
				old_score = true;
	
			}
		
		if(OBJECTS[i].gameObject_y_position>1){	
			OBJECTS.splice(i,1); // removing 1 element at index i
			
			i--;
		}
		
	}
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

		if(CLOUDS[i].cloud_x_position< -0.4 ||CLOUDS[i].cloud_x_position> 1.4){	//deleting
			CLOUDS.splice(i,1);  
		}	
	}

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
		
		if(HAWKS[i].hawk_x_position< -0.4 ||HAWKS[i].hawk_x_position> 1.4){ //deleting
			HAWKS.splice(i,1);  
		}
	}
}