let audio = new Audio('mixkit-game-ball-tap-2073.wav');

let position = new V2(0, 0);
let prv_pos = new V2(0, 0);
let direction = new V2(1, 0);

let snake_tail = [];
let prv_tail_pos = new V2(0, 0);
let current_tail_length = 0;

let snake_color = new RGB(52, 67, 7);
let background_color = new RGB(111, 142, 15);

let food = new V2(12, 0);
let free_spaces = [];

let is_game_start = false;
let score = 0;

let button_pressed = false;

function Fix_Tail(){
	let prv = new V2(0, 0);	
	for(let i = 0; i < snake_tail.length; i++){
		// tail staff
		if(i == 0){
			prv.x = snake_tail[i].x;
			prv.y = snake_tail[i].y;
			
			snake_tail[i].x = prv_pos.x;
			snake_tail[i].y = prv_pos.y;
		}else {
			let x = prv.x;
			let y = prv.y;
			
			prv.x = snake_tail[i].x;
			prv.y = snake_tail[i].y;
			
			snake_tail[i].x = x;
			snake_tail[i].y = y;
		}
		// Check if snake bite his tail or not
		if(position.x == snake_tail[i].x && position.y == snake_tail[i].y){
			On_Game_Over();
		}
	}
}

function Drop_Food(){
	// Add free space for food to drop
	let free_space_count = 0;
	for(let x = 0; x < 32; x++){
		for(let y = 0; y < 32; y++){
			let is_free = false;
			
			if(x != food.x && y != food.y){
				is_free = true;
			}else { is_free = false; }
			
			for(let t = 0; t < snake_tail.length; t++){
				if(x != snake_tail[t].x && y != snake_tail[t].y){
					is_free = true;
				}else {
					is_free = false;
				}
			}
			
			if(is_free){
				free_spaces[free_space_count] = new V2(x, y);
				free_space_count += 1;
			}
		}
	}
	// Drop food at random space
	let f_Sindex = Math.round(Math.random() * (free_spaces.length - 1));
	food.x = free_spaces[f_Sindex].x;
	food.y = free_spaces[f_Sindex].y;
}

function On_Food_Ate(){	
	// Add tail
	snake_tail[current_tail_length] = new V2(prv_tail_pos.x, prv_tail_pos.y);
	current_tail_length += 1;
	Drop_Food();
	audio.play();
	// Add score
	score++;
}

function Start_Game(){
	score = 0;
	position.x = 0;
	position.y = 0;
	current_tail_length = 0;
	for(let t = 0; t < snake_tail.length; t++){
		snake_tail.pop();
	}
	Drop_Food();
	document.getElementById("game-over").style.display = "none";
	document.getElementById("start-game").style.display = "none";
	is_game_start = true;
}

function On_Game_Over(){
	document.getElementById("my-score").innerHTML = score;
	document.getElementById("game-over").style.display = "block";
	is_game_start = false;
}

function Update(){
	if(!is_game_start) return 0;
	// Prv position
	prv_pos.x = position.x;
	prv_pos.y = position.y;
	// Prv tail position
	if(snake_tail.length > 0){
		prv_tail_pos.x = snake_tail[snake_tail.length - 1].x;
		prv_tail_pos.y = snake_tail[snake_tail.length - 1].y;
	}
	// Move snake
	position.x += direction.x;
	position.y += direction.y;
	// Check snake if goes outside of bound
	if(position.x > 31){
		position.x = 0;
	}else if(position.x < 0){
		position.x = 31;
	}
	if(position.y > 31){
		position.y = 0;
	}else if(position.y < 0){
		position.y = 31;
	}
	// If snake gets food
	if(position.x == food.x && position.y == food.y){
		On_Food_Ate();
	}
	// Update tail position
	Fix_Tail();
	button_pressed = false;
}

function Draw(){
	// Snake head
	Put_Cell(position, RGB_To_String(snake_color));
	// Draw snake tail
	for(let i = 0; i < current_tail_length; i++){
		let ct = ((i - 3) / (snake_tail.length - 1));
		let color = Lerp_RGB(snake_color, background_color, ct);
		Put_Cell(snake_tail[i], RGB_To_String(snake_color));
	}
	// Draw food
	let food_color = Lerp_RGB(background_color, snake_color, Math.abs(Math.cos(delta_count * 0.006)));
	Put_Cell(food, RGB_To_String(food_color));
	Draw_Grid();
}

function On_Key_Down(E){
	if(button_pressed) return 0;
	
	if(E.key == "w" || E.key == "W" || E.key == "ArrowUp"){
		if(direction.y != 1){
			direction.x = 0;
			direction.y = -1;
		}
	}else if(E.key == "s" || E.key == "S" || E.key == "ArrowDown"){
		if(direction.y != -1){
			direction.x = 0;
			direction.y = 1;
		}
	}
	if(E.key == "d" || E.key == "D" || E.key == "ArrowRight"){
		if(direction.x != -1){
			direction.y = 0;
			direction.x = 1;
		}
	}else if(E.key == "a" || E.key == "A" ||  E.key == "ArrowLeft"){
		if(direction.x != 1){
			direction.y = 0;
			direction.x = -1;
		}
	}
}

document.addEventListener("keydown", On_Key_Down);