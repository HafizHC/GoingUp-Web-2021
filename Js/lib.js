
function drawText(text,x,y,font,addw) {
	ctx.fillStyle = 'white';
	ctx.font = font + 'px Arial';
	let tW = ctx.measureText(text).width;
	ctx.fillText(text, x-tW/2 , y);
}

function drawTextAndImg(text,x,y,font,Img,w,h,d) {
	ctx.fillStyle = 'white';
	ctx.font = font + 'px Arial';
	let tW = ctx.measureText(text).width;
	ctx.fillText(text, x-tW/2 , y+font);
	ctx.drawImage(Img,x-tW/2-w-d,y,w,h);
}