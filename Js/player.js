class Player{

	constructor(rect,Gravity,Speed,Image){
		this.w = 40;
		this.h = 40;
		this.x = rect.x+rect.w/2-this.w/2;
		this.y = rect.y-this.h;
		this.g = Gravity;
		this.v = 0;
		this.s = Speed;
		this.score = 0;
		/*switch (Image) {
			case 0:
				this.image = 
				break;
			
		}*/
	}

	draw(){
		ctx.drawImage(playerImg[selectedPlayerImage],this.x,this.y,this.w,this.h);
	}

	update(e){
		this.x = e.screenX-cvs.offsetLeft;	
		this.v+=this.g*this.s;;
		this.y+=this.v*this.s;;
	}

}