var stairImg = [];
for(let i = 0; i<6; i++){
	stairImg[i] = [];
	for(let n = 0; n<2; n++){
		stairImg[i][n] = document.getElementById('stair' + i + n);
	}
}

var bacgraund = [];

for(let n = 0; n<8; n++){
	bacgraund[n] = document.getElementById('bg' + n);
}

const title =  document.getElementById('title');
const bgAlpha =  document.getElementById('BgAlpha');
const bgAlphaRc =  document.getElementById('BgAlphaRc');

var playerImg = [];

for(let n = 0; n<8; n++){
	playerImg[n] = document.getElementById('player' + n);
}

var goldImg = [];

for(let i = 0; i<3; i++){
	goldImg[i] = [];
	for(let n = 0; n<6; n++){
		goldImg[i][n] = document.getElementById('gold' + i + n);
	}
}

var goldBImg = [];


for(let n = 0; n<3; n++){
	goldBImg[n] = document.getElementById('goldB' + n);
}

const levelImg = document.getElementById('ybg');

const startBtnImg = document.getElementById('startBtn');

const selectBar =  document.getElementById('selectBar');

const resetBtnImg =  document.getElementById('resetBtn');

const resumeBtnImg =  document.getElementById('resumeBtn');

const exitBtnImg =  document.getElementById('exitBtn');