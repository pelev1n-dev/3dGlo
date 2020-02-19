window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Timer
  function countTimer(deadline){
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
      if(n < 10 && n >= 0){
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
  }
  setInterval(countTimer, 1000, '18 february 2020 22:07:00' );
  countTimer('18 february 2020 22:07:00');

  // Menu
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const menuItems = menu.querySelectorAll('ul>li');
    const closeBtn = document.querySelector('.close-btn');

    const handlerMenu = () => {
      /* version_1
      if(!menu.style.transform || menu.style.transform === `translate(-100%)`){
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
      */

      //version_2
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

  };
  toggleMenu();

  // PopUp
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpClose = document.querySelector('.popup-close');
    const popUpContent = document.querySelector('.popup-content');
    let count = 0;
    let popUpInterval;

    const popUpAnimate = () => {
      popUpInterval = requestAnimationFrame(popUpAnimate);
      count++;
      if (count < 45){
        popUpContent.style.left = count + '%';
      }
    };

    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popUp.style.display = 'block';
        if(screen.width > 768){
          popUpAnimate();
        }
      });
    });

    popUpClose.addEventListener('click', () => {
      popUp.style.display = 'none';
      count = 0;
      cancelAnimationFrame(popUpInterval);
    });

  };
  togglePopUp();

});