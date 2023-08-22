class rect{

	constructor(rect,Distance,Speed){
		this.w = 100;
		this.w1 = this.w;
		this.h = 25;
		this.distance = Distance;
		this.stairCnst = 0.2;
		let startStair = 1;
		rect.length==0 ? this.x = (cvs.offsetWidth-this.w)/2 : this.x = Math.floor(Math.random()*(cvs.offsetWidth-this.w));
		this.y = cvs.offsetHeight-(Distance*rect.length)-(1+startStair)*Distance;
		this.velocty = 0;
		this.speed = Speed;
		this.target = 0;

		this.c = false;
		this.a = true;	

		this.image = stairImg[0];
	}

	draw(){
		ctx.drawImage(this.image[Math.floor(!this.a)],this.x,this.y,this.w,this.h);

		if (this.goldA) {
			var rct = {
				x: this.x,
				y: this.y,
				w: this.w
			}
			this.gold.update(rct);
			this.gold.draw();			
		}
	}

	update(score,image){
		if (!this.c) {
			this.target=this.y+this.distance;
		}
		if (this.c&&this.y+this.velocty*this.speed<=this.target) {
			this.y+=this.velocty*this.speed;
		}else if (this.c) {
			this.y=this.target;
			if (this.y+this.h>cvs.height) {
				this.y =-this.distance;
				this.a = true;	
		 		this.x=Math.floor(Math.random()*(cvs.offsetWidth-this.w));
				this.newGold(score);
				image != undefined ? this.image = image : null;
			}
			this.w>70 ? this.w-=this.w1/100*this.stairCnst : null;
			this.c=false;
			this.velocty=0;
		}		
	}

	collision(j){
		this.c=true;
		this.velocty=j;
	}

	newGold(score){
		this.goldA = false;
		if(Math.random()>.5){
			this.goldA = true;
			var rct = {
				x: this.x,
				y: this.y,
				w: this.w
			}
			this.gold = new Gold(rct ,score);
		}
	}

}