const start = document.getElementById('start');
const reset = document.getElementById('reset');
const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("sec");

//store a reference to the startTimer variable
var startTimer = null;

start.addEventListener('click', function () {
    pause.style.visibility = 'visible';

    start.style.visibility = 'hidden';

    function startInterval() {
        startTimer = setInterval(function () {
            timer();
        }, 1000);
    }
    startInterval();
})

reset.addEventListener('click', function () {
    pause.style.visibility = 'hidden';
    resume.style.visibility = 'hidden';
    start.style.visibility = 'visible';

    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    stopInterval()
})

function timer() {
    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        stopInterval();
        pause.style.visibility = 'hidden';
        resume.style.visibility = 'hidden';
        start.style.visibility = 'visible';
    }
    else if (seconds.value != 0) {
        seconds.value--;
    }
    else if (minutes.value != 0 && seconds.value == 0) {
        seconds.value = 59;
        minutes.value--;
    }
    else if (hours.value != 0 && minutes.value == 0 && seconds.value == 0) {
        seconds.value = 59;
        minutes.value = 59;
        hours.value--;
    }
    return;
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}

const pause = document.getElementById('pause');
pause.style.visibility = 'hidden'

const resume = document.getElementById('resume');
resume.style.visibility = 'hidden';

pause.addEventListener('click', function () {
    resume.style.visibility = 'visible';
    pause.style.visibility = 'hidden';
    stopInterval();
});

resume.addEventListener('click', function () {
    resume.style.visibility = 'hidden';
    pause.style.visibility = 'visible';

    startTimer = setInterval(function () {
        timer();
    }, 1000);

});