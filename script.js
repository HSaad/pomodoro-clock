const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');

const sessionTime = document.querySelector('.session');
const breakTime = document.querySelector('.break');

const display = document.querySelector('.time');

let isPaused = false;
let time = new Date();

play.addEventListener('click', (e) =>{
	//console.log(sessionTime.value);
	if(isPaused == true){
		isPaused = false;
	}
	startTimer(sessionTime.value);
});

stop.addEventListener('click', (e) => {
	stopTimer();
});

pause.addEventListener('click', (e) =>{
	pauseTimer();
});

function startTimer(duration) {
	let offset = 0
	setInterval(function(){
		if(!isPaused){
			let milisec = offset + (new Date()).getTime() - time.getTime();
			display.textContent = duration - parseInt(milisec / 1000) 


		}
		//minutes = parseInt(timer, 10)
		//seconds = parseInt(minutes % 60, 10)

		//minutes = minutes < 10 ? "0" + minutes : minutes;
		//seconds = seconds < 10 ? "0" + seconds : seconds;

		//display.textContent = minutes + ":" + seconds;

		//if(--timer < 0){
		//	timer = duration; //restarts timer
		//}
	}, 10);
}

function stopTimer(){
	//clearInterval(startTimer);
	display.textContent = sessionTime.value;
}

function pauseTimer(){
	isPaused = true;
}

//switches between session timer and break timer
function switchSession(){

}