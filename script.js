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
		time = new Date();
		isPaused = false;
	}
	startTimer(displayToSec());
});

stop.addEventListener('click', (e) => {
	stopTimer();
});

pause.addEventListener('click', (e) =>{
	pauseTimer();
});

//FUNCTION

function startTimer(duration) {
	let offset = 0
	setInterval(function(){
		if(!isPaused){
			let milisec = offset + (new Date()).getTime() - time.getTime();
			secToDisplay(duration - parseInt(milisec / 1000));

			if(displayToSec() < 0){
				secToDisplay(duration);
			}
		}
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

//turn display time to total seconds in int
function displayToSec(){
	let time = (display.textContent).split(":");
	let minutes = parseInt(time[0]);
	let seconds = parseInt(time[1]);

	let totalSeconds = minutes * 60 + seconds;
	return totalSeconds;
}

//turn total number of seconds into display time
function secToDisplay(totalSeconds){
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	display.textContent = minutes + ":" + seconds;
}
