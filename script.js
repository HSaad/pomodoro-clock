const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');

const sessionTime = document.querySelector('.session');
const breakTime = document.querySelector('.break');

const display = document.querySelector('.time');
const name = document.querySelector('.name'); //name of the session ('Break' or 'Session')

let isPaused = false;
let time = new Date();
let isPlayClicked = false;

play.addEventListener('click', (e) =>{
	e.preventDefault();

	if (isPlayClicked === false){
		startTimer(displayToSec());
	}
	isPlayClicked = true;
});

stop.addEventListener('click', (e) => {
	stopTimer();
});

pause.addEventListener('click', (e) =>{
	e.preventDefault();
	pauseTimer();
});

reset.addEventListener('click', (e) =>{
	resetTimer();
});

function startTimer(duration) {
	let offset = 0;
	time = new Date();
	isPaused = false;
	let interval = setInterval(function(){
		if(!isPaused){
			let milisec = offset + (new Date()).getTime() - time.getTime();
			secToDisplay(duration - parseInt(milisec / 1000));
			
			if(duration - parseInt(milisec / 1000) < 0){
				switchSession();
				clearInterval(interval);
			}
		}else{

			clearInterval(interval);
		}
	}, 10);
}

function stopTimer(){
	isPaused = true;
	isPlayClicked = false;

	if(name.textContent == "Session"){
		validSessionTime();
	}else{
		validBreakTime();
	}
}

function pauseTimer(){
	isPaused = true;
	isPlayClicked = false;
}

function resetTimer(){
	isPaused = true;
	isPlayClicked = false;
	name.textContent = "Session";

	validSessionTime(); //resets timer to session
	
}


//switches between session timer and break timer
function switchSession(){
	if(name.textContent == "Session"){
		//switch to break
		name.textContent = "Break";

		validBreakTime(); 
		
	}else {
		//switch to session
		name.textContent = "Session";
		validSessionTime();
		
	}
	startTimer(displayToSec());
}

//turn display time to total seconds (int)
function displayToSec(){
	let time = (display.textContent).split(":");
	let minutes = parseInt(time[0]);
	let seconds = parseInt(time[1]);

	let totalSeconds = minutes * 60 + seconds;
	return totalSeconds;
}

//turn total number of seconds into display time (minutes : seconds)
function secToDisplay(totalSeconds){
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	display.textContent = minutes + ":" + seconds;
}

function validSessionTime(){
	if(+sessionTime.value > 60 || +sessionTime.value < 1){
		sessionTime.value = 25;
		secToDisplay(25 * 60);
	}else{
		secToDisplay(+sessionTime.value * 60);
	}
}

function validBreakTime(){
	if(+breakTime.value > 20 || +breakTime.value < 1){
		breakTime.value = 5;
		secToDisplay(5 * 60);
	}else{
		secToDisplay(+breakTime.value * 60)
	}
}