window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Timer
  function countTimer(deadline) {
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
  }

  setInterval(countTimer, 1000, '18 february 2020 22:07:00');
  countTimer('18 february 2020 22:07:00');

  // Menu
  const toggleMenu = () => {

    const menu = document.querySelector('menu');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click',(event) => {

      let targetMenu = event.target;
      let targetClose = event.target;
      let targetLink = event.target;
      let targetMain = event.target;

      targetMenu = targetMenu.closest('.menu');
      if(targetMenu){
        handlerMenu();
        return;
      }

      targetClose = targetClose.closest('.close-btn');
      if(targetClose){
        handlerMenu();
        return;
      }

      targetLink = targetLink.closest('ul>li');
      if (targetLink) {
        menuItems.forEach((item, i) => {
          if (item === targetLink) {
            handlerMenu();
          }
        });
      }

      targetMain = targetMain.closest('menu');
      if(!targetMain && menu.classList.contains('active-menu')){
        handlerMenu();
      }

    });

  };
  toggleMenu();

  // PopUp (modal window)
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpContent = document.querySelector('.popup-content');
    let count = 0;
    let popUpInterval;

    const popUpAnimate = () => {
      popUpInterval = requestAnimationFrame(popUpAnimate);
      count++;
      if (count < 45) {
        popUpContent.style.left = count + '%';
      }
    };

    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popUp.style.display = 'block';
        if (screen.width > 768) {
          popUpAnimate();
        }
      });
    });

    const cancelAnimation = () => {
      count = 0;
      cancelAnimationFrame(popUpInterval);
    };

    popUp.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = 'none';
        cancelAnimation();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUp.style.display = 'none';
          cancelAnimation();
        }
      }
    });

  };
  togglePopUp();

  // Scroll
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const blockID = anchor.getAttribute('href').substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    toggleTabContent(0);

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }

    });
  };
  tabs();

  // Slider
  const slider = () => {
    const slider = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    const btn = document.querySelectorAll('.portfolio-btn');
    const ulDots = document.querySelector('.portfolio-dots');
    let dot = document.querySelectorAll('.dot');

    const renderItem = () => {
      for(let i = 0; i < slide.length; i++){
        let li = document.createElement('li');
        li.classList.add('dot');
        ulDots.appendChild(li);
      }
      dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
    };
    renderItem();

    let currentSlide = 0;
    let interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval =setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if(target.matches('#arrow-left')) {
        currentSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
        })
      }

      if(currentSlide >= slide.length){
        currentSlide = 0;
      }

      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        startSlide(1500);
      }
    });

    startSlide(1500);

  };
  slider();

  // Change image
  const commandPhoto = document.querySelectorAll('.command__photo');
  for (let i = 0; i < commandPhoto.length; i++){
    let src = commandPhoto[i].getAttribute('src');
    let data = commandPhoto[i].getAttribute('data-img');
    commandPhoto[i].addEventListener('mouseover', (elem) => {
      const target = elem.target.matches('img');
      if(target){
        commandPhoto[i].setAttribute('src', `${data}`);
      }
    });
    commandPhoto[i].addEventListener('mouseout', (elem) => {
      const target = elem.target.matches('img');
      if(target){
        commandPhoto[i].setAttribute('src', `${src}`);
      }
    });
  }

  // Calc
  const calcItem = document.querySelectorAll('.calc-item');
  for(let i = 0; i < calcItem.length; i++){
    calcItem[i].addEventListener('input', () => {
      calcItem[i].value = calcItem[i].value.replace(/[^0-9]/, '');
    });
  }

});