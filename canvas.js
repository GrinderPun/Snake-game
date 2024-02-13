class V2 {
	constructor(X, Y){
		this.x = X;
		this.y = Y;
	}
}

class RGB {
	constructor(R, G, B){
		this.r = R;
		this.g = G;
		this.b = B;
	}
}

function Lerp(A, B, T){
	return ((B - A) * T) + A;
}

function Lerp_RGB(A, B, T){
	return new RGB(Lerp(A.r, B.r, T), Lerp(A.g, B.g, T), Lerp(A.b, B.b, T));
}

function RGB_To_String(Color){
	return "rgb(" + Color.r + "," + Color.g + "," + Color.b + ")";
}

let canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");

let screen_res = 512;
let world_unit = 32;
let unit_size = Math.round(screen_res / world_unit);

function Clear_Screen(){
	ctx.fillStyle = "rgb(111, 142, 15)";
	ctx.fillRect(0, 0, screen_res, screen_res);;
}

function Put_Cell(Position, Color){
	ctx.fillStyle = Color;
	let x = Position.x * unit_size;
	let y = Position.y * unit_size;
	ctx.fillRect(x, y, unit_size, unit_size);
}

function Draw_Grid(){
	ctx.strokeStyle = "rgb(52, 67, 7)";
	
	for(let y = 0; y < world_unit + 1; y++){
		ctx.beginPath();
		ctx.moveTo(0, y * unit_size);
		ctx.lineTo(screen_res - 1, y * unit_size);
		ctx.lineWidth = 1;
		ctx.stroke();
	}
	
	for(let x = 0; x < world_unit + 1; x++){
		ctx.beginPath();
		ctx.moveTo(x * unit_size, 0);
		ctx.lineTo(x * unit_size, screen_res - 1);
		ctx.lineWidth = 1;
		ctx.stroke();
	}
}