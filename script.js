const start = document.getElementById('start');
const reset = document.getElementById('reset');
const hours = document.getElementById("hour");
const minutes = document.getElementById("minute");
const seconds = document.getElementById("sec");

//creating the pause button.
const pause = document.createElement('button');
pause.innerHTML = "Pause";
pause.setAttribute("id", "pause");
pause.setAttribute("class", "btn");
document.getElementById('container').appendChild(pause);
pause.style.visibility = "hidden";

//creating the resume button.
const resume = document.createElement('button');
resume.innerHTML = "Resume";
resume.setAttribute("id", "resume");
resume.setAttribute("class", "btn");
document.getElementById('container').appendChild(resume);
resume.style.visibility = "hidden";


//store a reference to the startTimer variable
var startTimer = null;


start.addEventListener('click', () => {
    pause.style.visibility = 'visible';
    resume.style.visibility = 'hidden';
    start.style.visibility = 'hidden';
    checkFieldValue();

    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        pause.style.visibility = 'hidden';
        resume.style.visibility = 'hidden';
        start.style.visibility = 'visible';
    } else {
        function startInterval() {
            startTimer = setInterval(function () {
                timer();
                checkFieldValue();
            }, 1000);
        }
    }
    startInterval();
    return;
});


pause.addEventListener('click', () => {
    start.style.visibility = 'hidden';
    pause.style.visibility = 'hidden';
    resume.style.visibility = 'visible';
    checkFieldValue();
    stopInterval();

    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        pause.style.visibility = 'hidden';
        resume.style.visibility = 'hidden';
        start.style.visibility = 'visible';
    };
    return;
});


resume.addEventListener('click', () => {
    start.style.visibility = 'hidden';
    resume.style.visibility = 'hidden';
    pause.style.visibility = 'visible';
    checkFieldValue();

    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        pause.style.visibility = 'hidden';
        resume.style.visibility = 'hidden';
        start.style.visibility = 'visible';
    } else {
        startTimer = setInterval(function () {
            timer();
            checkFieldValue();
        }, 1000);
    };
    return;
});


reset.addEventListener('click', () => {
    pause.style.visibility = 'hidden';
    resume.style.visibility = 'hidden';
    start.style.visibility = 'visible';

    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    stopInterval();

    return;
});


function timer() {
    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        stopInterval();
        pause.style.visibility = 'hidden';
        resume.style.visibility = 'hidden';
        start.style.visibility = 'visible';
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
    } else if (seconds.value != 0) {
        seconds.value--;
    } else if (minutes.value != 0 && seconds.value == 0) {
        seconds.value = 59;
        minutes.value--;
    } else if (hours.value != 0 && minutes.value == 0 && seconds.value == 0) {
        seconds.value = 59;
        minutes.value = 59;
        hours.value--;
    }
    return;
};


function checkFieldValue() {
    if (hours.value > 100 || minutes.value > 59 || seconds.value > 59) {
        seconds.value = 0;
        minutes.value = 0;
        hours.value = 0;
        mypopup();
    } else if (hours.value == "") {
        hours.value = 0;
    } else if (minutes.value == "") {
        minutes.value = 0;
    } else if (seconds.value == "") {
        seconds.value = 0;
    }
    return;
};


//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
    return;
};

//limiting a few characters in the field
function validateNumber(evt) {
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers   
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // Backspace and Tab and Enter
        key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45 || key == 116) {
        // input is VALID
    } else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
    return;
};


//Alert
let mypopup = () => {

    let modalOverlayError = document.createElement("div");
    modalOverlayError.setAttribute("class", "modal-overlay-error");
    document.body.appendChild(modalOverlayError);

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");
    document.body.appendChild(wrapper);
    modalOverlayError.appendChild(wrapper);

    let toast = document.createElement("div");
    toast.setAttribute("class", "toast");
    document.body.appendChild(toast);
    wrapper.appendChild(toast);

    let content = document.createElement("div");
    content.setAttribute("class", "content");
    document.body.appendChild(content);
    toast.appendChild(content);

    let details = document.createElement("div");
    details.setAttribute("class", "details");
    details.innerHTML = "<span>CRITICAL ERROR!</span> <p>Enter only valid values!</p>"
    document.body.appendChild(details);
    content.appendChild(details);

    let closeBTN = document.createElement("div");
    closeBTN.setAttribute("class", "close-icon");
    closeBTN.innerHTML = "<i class='uil uil-times'></i>";
    document.body.appendChild(closeBTN);
    toast.appendChild(closeBTN);

    closeBTN.addEventListener('click', () => {
        wrapper.classList.add('hide');
        setInterval(function () {
            modalOverlayError.classList.remove('show-error');
        }, 900);
    });

    //close alert on ESC KeyBoard
    window.document.onkeydown = function (e) {
        if (!e) e = event;
        if (e.keyCode == 27)
            wrapper.classList.add('hide');
        setInterval(function () {
            modalOverlayError.classList.remove('show-error');
        }, 900);
    }

    modalOverlayError.classList.add('show-error');

    setInterval(function () {
        modalOverlayError.classList.remove('show-error');
    }, 5900);
    setInterval(function () {
        wrapper.classList.add('hide');
    }, 5000);





    return;
};


//will never be able to leave the number field empty.
document.defaultView.addEventListener('click', () => {
    if (hours.value == "" || hours.value == 00 || hours.value == 000) {
        hours.value = 0;
    } if (minutes.value == "" || minutes.value == 00) {
        minutes.value = 0;
    } if (seconds.value == "" || seconds.value == 00) {
        seconds.value = 0;
    };
    return;
});


//press tab = auto field when empty
document.getElementById("container").addEventListener('keydown', (event) => {
    if (event.keyCode == 9 && hours.value == "" || event.keyCode == 9 && hours.value == 00 || event.keyCode == 9 && hours.value == 000) {
        hours.value = 0;
    } if (event.keyCode == 9 && minutes.value == "" || event.keyCode == 9 && minutes.value == 00) {
        minutes.value = 0;
    } if (event.keyCode == 9 && seconds.value == "" || event.keyCode == 9 && seconds.value == 00) {
        seconds.value = 0;
    };
    return;
});


//can't type more than 2 digits.
function checkFieldLength(input) {
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
    return;
};


//Hundred is the limit
function hourFieldLength(input) {
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }
    return;
};
