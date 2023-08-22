var cvs = document.getElementById("cvs"); 
var ctx = cvs.getContext('2d');

let startBtn;
let choiceBtn;
let choiceBtnX = cvs.offsetWidth; // right adn up 
let choiceBtnY = 380;
let choiceBtnWH = 20;
let openPlayers = [true,false,false,false,false,false,false,false];
let playersPrice = [0,10,20,30,40,10,20,30];
var mBacgaundNum = Math.floor((Math.random()-.0000001)*3);

function mSetup() {
	deleteAllbuttons();
	let r = 80;
	let x = 20;
	startBtn = newButton(startBtnImg,(cvs.offsetWidth-r)/2, cvs.offsetHeight/10*7.5, r, r, start);
	choiceBtn = newButton(null,choiceBtnX-7*choiceBtnWH,choiceBtnY,7*choiceBtnWH,2.3*choiceBtnWH,choicePlayer);
	mDraw();
	mSlctBtnDraw();
	mBtnDraw();
}

function mDraw() {
	ctx.clearRect(0,0,cvs.width,cvs.height);
	ctx.drawImage(bacgraund[mBacgaundNum],0,0,cvs.width,cvs.height);
	let wh = 300; 
	ctx.drawImage(title,(cvs.offsetWidth-1.08*wh)/2,20,1.08*wh,0.5*wh);
	drawText("High Score: " + highScore, cvs.offsetWidth/2, 0.5*wh, '30px Arial');
	gTime = 0;
	drawGolds(cvs.offsetWidth-120,200);
}

function mBtnDraw(){
	startBtn.draw();
}

function mSlctBtnDraw(){ 
	ctx.drawImage(selectBar,choiceBtnX-7*choiceBtnWH,choiceBtnY,7*choiceBtnWH,2.3*choiceBtnWH);
	ctx.drawImage(playerImg[selectedPlayerImage] ,choiceBtnX-7*choiceBtnWH+15,choiceBtnY+(2.3*choiceBtnWH-30)/2,30,30);
}

var choiceBtns = [];
var exitSelectBtn;
function choicePlayer(){

	let WH = 40;
	let goldYDistance = 5;
	let goldWH = 15;
	let y = choiceBtnY+choiceBtnWH*2.3;
	let x = WH/2;
	let yDistance = 40;
	let xDistance = (cvs.offsetWidth-(5*WH))/3;

	mDraw();
	ctx.globalAlpha = 0.5;
	ctx.drawImage(bgAlpha,choiceBtnX-12*choiceBtnWH,choiceBtnY-1.15*choiceBtnWH,12*choiceBtnWH,3.45*choiceBtnWH);
	ctx.drawImage(bgAlphaRc,0,y,cvs.offsetWidth,cvs.offsetHeight-y+WH/2);
	ctx.globalAlpha = 1;
	mSlctBtnDraw();
	deleteButton(choiceBtn);
	deleteButton(startBtn);
	
	
	exitSelectBtn = newButton(null,0,0,cvs.offsetWidth,y,function () {exitChoice();});

	y+= WH/2 

	let imgX , g, y1;
	y1 = y + yDistance+WH;
	for(let i = 0;i < 8;i++){
		i<3 ? g=0: i<5 ? g=1:g=2;

		if(i<4){
			imgX = x+(WH+xDistance)*i;
			choiceBtns[i] = newButton(playerImg[i], imgX, y, WH, WH, select, i);
			!openPlayers[i] ? drawTextAndImg(playersPrice[i],imgX+WH/2,y+WH+goldYDistance,15,goldImg[g][0],goldWH,goldWH,10):null;
		}else{
			imgX = x+(WH+xDistance)*(i-4);
			choiceBtns[i] = newButton(playerImg[i], imgX, y1, WH, WH, select , i);
			!openPlayers[i] ? drawTextAndImg(playersPrice[i],imgX+WH/2,y1+WH+goldYDistance,15,goldImg[g][0],goldWH,goldWH,10):null;
		}
		choiceBtns[i].draw();

	}
}

function select(i) {
	if(openPlayers[i]){
		open(i);
	}else{
		let g;	
		i<3 ? g=0: i<5 ? g=1:g=2;
			if(gold[g]>=playersPrice[i]){
			gold[g]-=playersPrice[i];
			open(i);
		}
	} 
}

function open (i) {
	selectedPlayerImage = i;
	openPlayers[i] = true;
	exitChoice();
	choicePlayer();
}

function exitChoice(){
	let a = choiceBtns.length
	deleteButton(exitSelectBtn);
	for(let n = 0;n < a;n++){
		deleteButton(choiceBtns[n]);
	}
	mSetup();
}

function start() {
	deleteButton(startBtn);
	gSetup();
}

window.onload = () => mSetup();