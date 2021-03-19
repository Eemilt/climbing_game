function spider(ctx) {
	move(); //movement
	x = Math.floor(Math.random() * 3); 
    ctx.drawImage(hamis_array[x],rectX,rectY, 0.06, 0.06); 
}


function gameObjects_animate(){

    let probabilityxaxis = Math.random() * (0.719 - 0.131) +0.118; // window x position 
    let height_between = 0.15		//height between windows
    let can_spawn= false;  		//true if there is space for new window
    if(OBJECTS.length>0){		

        if(OBJECTS[OBJECTS.length-1].gameObject_y_position>height_between){		
            can_spawn= true;
        }
    }else{
        can_spawn=true;
    }
        
    if(can_spawn== true){		
        
        let window_or_star = Math.random();
        if(window_or_star<0.04){
            OBJECTS.push(new GameObjects(star_image,probabilityxaxis, -0.1,0.07,0.07));
            
            
        }else{
            OBJECTS.push(new GameObjects(window_image,probabilityxaxis, -0.1,0.15,0.09));		
        }

    }
    move_gameObjects();
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


function spawn_cloud(){
	let spawn_probability = Math.random();
	let spawn_height = (Math.random() * (0.3 - 0.0) + 0.0).toFixed(4);
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