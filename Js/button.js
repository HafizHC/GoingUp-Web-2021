var buttons = [];

cvs.onmouseup = mouseup;

function newButton(image,x,y,w,h,func,inpt){
	return buttons[buttons.length] = new button(image,x,y,w,h,func,buttons.length,inpt);
}

function deleteButton(button){
	delete buttons[button.id];
}

function deleteAllbuttons(){
	buttons = [];
}

function editButtonFunc(button,func,inpt){
	buttons[button.id].fnct = func;
	buttons[button.id].inpt = inpt;
}

function mouseup(e){
	buttons.forEach( t=> {
		t.update({x: e.offsetX, y: e.offsetY});
	});
	buttons.forEach( t=> {
		if(t.click) {
			t.func();
			t.click = false;
		}
	});
}

class button {
	constructor(image,x,y,w,h,fnct,id,inpt){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fnct = fnct;
		this.id = id;
		this.image = image;
		this.inpt = inpt;
		this.click = false;
	}
	
	update(click){
		if (click.x>this.x&&click.x<this.x+this.w) {
			if (click.y<this.y+this.h&&click.y>this.y) {
				this.click = true;
			}
		}	
	}

	func() {
		this.fnct(this.inpt);	
	}

	draw(){
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
	}
}