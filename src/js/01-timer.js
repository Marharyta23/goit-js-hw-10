import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let delay;

function startTimer() {
  delay = setInterval(timerSet(), 1000);
}

function timerSet() {
  const date = new Date();
  const timeLeft = userSelectedDate - date;

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;

  refs.days = refs.btn.addEventListener('click', () => {
    if (userSelectedDate) {
      refs.btn.setAttribute('disabled', true);
      refs.input.setAttribute('disabled', true);
      startTimer();
    }
  });
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      refs.btn.setAttribute('disabled', true);
    } else {
      refs.btn.setAttribute('disabled', false);
    }
  },
};

console.log(userSelectedDate);

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
