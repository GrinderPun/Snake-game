let lastFrameTime = 0.0;
let time_count = 0;
let update_rate = 80;	// m/s

let delta_count = 0;

function Loop(TimeSinceStart){
	// Calculate frame rendered time
	let deltaTime = TimeSinceStart - lastFrameTime;
	delta_count += deltaTime;
	// Count
	time_count += deltaTime;
	// Update game logic
	if(time_count >= update_rate){
		Update();
		// Reset Count
		time_count = 0;
	}
	Clear_Screen();
	// Draw a thing
	Draw();
	// Assign current time value to last time
	lastFrameTime = TimeSinceStart;
	// Loop
	window.requestAnimationFrame(Loop);
}

window.requestAnimationFrame(Loop);