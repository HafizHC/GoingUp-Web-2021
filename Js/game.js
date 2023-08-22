let clck;

cvs.onmousedown = mousedown;
cvs.onmousemove = move;

let timer;

let rects = [];
let player;
let selectedPlayerImage = 0;

let gravity = 10;
let stariDistance = 100;
let jumpS = -Math.sqrt(gravity*stariDistance);
let speed = .32; //.32
let speedd = speed;
let sIncrease = .0009;

var status;
let collsionS = false;

let highScore = 0;
let gold = [0,0,0];

let stopBtn;

function gSetup(){
	deleteAllbuttons();
	status = 0; //default
	heightLevel = 0;
	bacgraundA = 0;
	bacgraundNum = 0;
	speed = speedd;
	rects = [];
	for(let i = 0; i<cvs.height/stariDistance+1;i++){
		rects[i] = new rect(rects,stariDistance,speed);
		if(i==0) continue;
		rects[i].newGold(0);
	}
	player = new Player(rects[0],gravity,speed,null);
	stopBtn = newButton(null,0,0,cvs.offsetWidth,cvs.offsetHeight,click);	
	timer = setInterval(loop.bind(this), 1000/60);
}

function loop(){
	switch (status) {
		case "0":
			draw();
			break;
		case "1":
			play();
			draw();
			break;
		case "2":
			clearInterval(timer);
			waitAndEnd(1);	
			break;
		case "3": 
			clearInterval(timer);	
			draw();
			waitAndEnd(null);
			break;
	}
	//test();
}

function draw() {
	ctx.clearRect(0,0,cvs.width,cvs.height);
	trnstnBacgraundAndDraw(heightLevel+3<bacgraund.length ? heightLevel+3:mBacgaundNum);
	for(let i = 0; i<rects.length;i++){
		rects[i].draw();
	}
	player.draw();
	let h = 150;
	let w = 15;
	let x = player.score!=0 ? 20+h-w-(h-w)*(player.score/200) : 20+h-w;
	x<20 ? x = 20 : null;
	ctx.drawImage(levelImg,20,20,w,h);
	ctx.drawImage(playerImg[selectedPlayerImage],20,x,w,w);
	drawGolds(cvs.offsetWidth-120,20,0,true);
	drawText("Score: " + player.score , cvs.offsetWidth/2, 30, '30px Arial');

}
let bacgraundNum = 0;
let bacgraundA = 0;

function trnstnBacgraundAndDraw(i){
	if(bacgraundA<1&&bacgraundNum!=i){
		bacgraundA+.005<=1 ? bacgraundA+=.005 : bacgraundA=1;
		ctx.globalAlpha = 1.1-bacgraundA;
		ctx.drawImage(bacgraund[bacgraundNum],0,0,cvs.width,cvs.height);
		ctx.globalAlpha = bacgraundA;
		ctx.drawImage(bacgraund[i],0,0,cvs.width,cvs.height);
		ctx.globalAlpha = 1;
		if (bacgraundA==1) {
			bacgraundA = 0;
			bacgraundNum = i;
		}
	}else{
		ctx.drawImage(bacgraund[bacgraundNum],0,0,cvs.width,cvs.height);
	}
}

function waitAndEnd(e) {
	var btnPc = 3; 
	e != null ? btnPc = 2:null;
	ctx.globalAlpha = 0.5;
	ctx.drawImage(BgAlphaRc,0,0,cvs.width,cvs.height);
	ctx.globalAlpha = 1;
	let buttonW = 200;
	let buttonH = 40;
	let buttonYDstnc = 20;
	let buttonY = (cvs.height-btnPc*buttonH-(btnPc-1)*buttonYDstnc)/2;
	let exitBtn = newButton(exitBtnImg,(cvs.width-buttonW)/2,buttonY,buttonW,buttonH,
		function(){
			mSetup();
		}
	);
	let resetBtn = newButton(resetBtnImg,(cvs.width-buttonW)/2,buttonY+buttonH+buttonYDstnc,buttonW,buttonH,
		function(){
			gSetup();
		}
	);
	if(e == null){
		let resumeBtn = newButton(resumeBtnImg,(cvs.width-buttonW)/2,buttonY+(buttonH+buttonYDstnc)*2,buttonW,buttonH,
			function(){
				let reStartBtn = newButton(null,player.x,player.y,player.w,player.h,function(){
					status = 1;
					timer = setInterval(loop.bind(this), 1000/60);
					deleteButton(reStartBtn);
				});
				deleteButton(exitBtn);
				deleteButton(resetBtn);
				deleteButton(resumeBtn);
				draw();
				drawText("Click On The Player",cvs.offsetWidth/2, 70, '30px Arial');
			}
		);
		resumeBtn.draw();
	}else {
		drawText("Game Over",cvs.offsetWidth/2, (cvs.height-btnPc*buttonH-(btnPc-1)*buttonYDstnc-90)/2, '30px Arial');
		drawText("Score: " + player.score,cvs.offsetWidth/2, (cvs.height-btnPc*buttonH-(btnPc-1)*buttonYDstnc-30)/2, '30px Arial');
	}
	exitBtn.draw();
	resetBtn.draw();
	
}

let heightLevel;

function play() {
	for(let i = 0; i<rects.length; i++){
		if (rects[i].goldA && collsion(player, rects[i].gold)) {
			gold[rects[i].gold.level]++;
			rects[i].goldA = false;
		}
		if(rects[i].a == false || rects[0].velocty != 0) continue;
		if(collsion(player, rects[i])){
			speed<.32 ? UpdSpeed(speed+=sIncrease):null;
 			rects[i].a = false;
 			player.v=jumpS;
 			player.score++;
 			if (player.score>highScore) {
 				highScore = player.score;
 			}
 			for(let i = 0; i<rects.length; i++){
 				rects[i].collision(-jumpS);
 			}
		}
	}

	player.update(clck);
	heightLevel = Math.floor(player.score/20);
	for(let i = 0; i<rects.length; i++)
		rects[i].update(player.score,stairImg[heightLevel]);

	if (player.x<0) {
		player.x=0;
	}
	if (player.x+player.w>cvs.width) {
		player.x=cvs.width-player.w;
	}
	if (player.y+2*player.h>cvs.height) {
		status=2;
	}
}


function click() {
	switch (status) {
		case "0":
			player.x = clck.offsetX;
	   	    status = 1;
			break;
		case "1":
			status = 3;
			break;
	}
}

function collsion(o1,o2){	
	if (o1.x+o1.w>o2.x&&o1.x<o2.x+o2.w) {
	 	if (o1.y+o1.h<o2.y+o2.h&&o1.y+o1.h>o2.y) {
	 		return true;		
		}
	}	
}

function UpdSpeed(s){
	player.s = s;
	for(let i = 0; i<rects.length; i++){
		rects[i].speed=s;
	}
}




function move(e){
	clck = e;
}

function mousedown(e){
	clck = e;
}

function test () {
	player.x=cvs.offsetWidth/2-player.w/2;
	for(let i = 0; i<rects.length; i++){
		rects[i].x=cvs.offsetWidth/2-rects[i].w/2;
		if (rects[i].goldA) {
			rects[i].gold.x = cvs.offsetWidth/2-rects[i].gold.w/2;
		}
	}

}