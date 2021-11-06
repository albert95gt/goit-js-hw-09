import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]'),
}


refs.startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      
      const currentDateTime = Date.now();
      const selectedDateTime = selectedDates[0].getTime();
      
      currentDateTime > selectedDateTime ? Notify.failure("Please choose a date in the future") : refs.startBtn.removeAttribute('disabled'); 
    
    },
  };

const fp = flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', onClickStartBtn)

let isActive = false;
function onClickStartBtn(){
  if (isActive) {
    return;
  }
    const timerId = setInterval(function() {
      isActive = true;
        const currentDateTime = Date.now();

        const selectedDateTime = fp.selectedDates[0].getTime();
    
        const deltaTime = selectedDateTime - currentDateTime;
        
        const time = convertMs(deltaTime)

        updateTime(time);

        if (time.seconds === "00") {
          removeInterval(timerId);
        }

    }, 1000);
}

function removeInterval(id){
  clearInterval(id);
}

function addLeadingZero(value){
  return String(value).padStart(2, "0");
}

function updateTime({ days, hours, minutes, seconds }){
   
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }



