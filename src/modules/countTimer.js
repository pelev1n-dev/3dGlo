const countTimer = (deadline) => {
  let timerHours = document.querySelector('#timer-hours');
  let timerMinutes = document.querySelector('#timer-minutes');
  let timerSeconds = document.querySelector('#timer-seconds');

  function getTimeRemaining() {
    let dateStop = new Date(deadline).getTime();
    let dateNow = new Date().getTime();
    let timeRemaining = (dateStop - dateNow) / 1000;

    let hours = Math.floor(timeRemaining / 60 / 60);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60);

    return {timeRemaining, hours, minutes, seconds};
  }

  function check(n) {
    if (n < 10 && n >= 0) {
      n = '0' + n;
    }
    return n;
  }

  function updateClock() {
    let timer = getTimeRemaining();

    if (timer.timeRemaining > 0) {
      timerHours.textContent = `${check(timer.hours)}`;
      timerMinutes.textContent = `${check(timer.minutes)}`;
      timerSeconds.textContent = `${check(timer.seconds)}`;
    } else {
      return countTimer(new Date(deadline).getTime() + 86400000);
    }
  }

  updateClock();
};

export default countTimer;