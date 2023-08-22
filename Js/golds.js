{
	var gTime = 0;
	let spin = .15;
	let yDistance = 15;
	let leftRightSpace = 20;
	let upDownSpace = 10;

	function drawGolds(x,y,cntn,spinB){
		gTime<goldImg[0].length-1 ? gTime+=spin : gTime = 0;
		let font = 20;
		ctx.font = font+'px Arial';
		for(let i = 0; i<goldBImg.length;i++){
			if(gold[i] == cntn) continue;
			let tWidth = ctx.measureText(gold[i]).width;
			let r = font+upDownSpace/2;
			let goldBarDistance = font/2;

			ctx.drawImage(goldBImg[i], goldBarDistance+r+x, y+i*(font+yDistance), tWidth+leftRightSpace, font+upDownSpace);
			drawText(gold[i], goldBarDistance+r+x+(tWidth+leftRightSpace)/2, y+(font+2.5)+i*(font+yDistance));
			if(spinB) ctx.drawImage(goldImg[i][Math.floor((gTime+goldImg[0].length/3*i)%goldImg[0].length)] ,x ,y+2.5+i*(font+yDistance) ,r ,r);
			else ctx.drawImage(goldImg[i][0] ,x ,y+2.5+i*(font+yDistance) ,r ,r);
		}
	}
}

class Gold {

	constructor(rect, score){
		this.w = 25;
		this.h = 25;
		this.x = rect.x + Math.random()*(rect.w-this.w);
		this.y = rect.y - this.h;
		this.level = score/100<goldImg.length ? Math.floor(score/100) : goldImg.length-1
		this.Img = goldImg[this.level];
		this.time = 0;
		;
	}

	update(rect){
		this.time<this.Img.length-1 ? this.time+=.15 : this.time = 0;
		this.y = rect.y - this.h;
	}

	draw() {
		ctx.drawImage(this.Img[Math.floor(this.time)] ,this.x ,this.y ,this.w ,this.h);
	}

}