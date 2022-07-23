import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
Notiflix.Notify.init({
    position: "center-center",
    timeout: 2000
});

const startButton = document.querySelector('[data-start]');
startButton.style.opacity = "50%";
let timerProcess;

const visualTimer = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const dataPicker = document.querySelector("#datetime-picker");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onDatePick,
};

flatpickr(dataPicker, options);

function onDatePick(selectedDates){
    const currentDate = new Date;
    if(selectedDates[0].getTime() < currentDate.getTime()){
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
    }
    startButton.style.opacity = "100%";
    startButton.addEventListener("click", () => {
        timerProcess = setInterval(updateTimer, 1000, selectedDates[0]);
        startButton.style.opacity = "50%";
    }, {once: true});  
}


function updateTimer(timer){
    const currentDate = new Date;
    const diferance = timer.getTime() - currentDate.getTime();
    if(diferance <= 0){
        clearInterval(timerProcess);
        dataSet(convertMs(0));
        return;
    }
    dataSet(convertMs(diferance));
}

function dataSet({ days, hours, minutes, seconds } = {}){
    visualTimer.days.textContent = addLeadingZero(days);
    visualTimer.hours.textContent = addLeadingZero(hours);
    visualTimer.minutes.textContent = addLeadingZero(minutes);
    visualTimer.seconds.textContent = addLeadingZero(seconds);
    
}

function addLeadingZero(value){
    return value.toString().padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }