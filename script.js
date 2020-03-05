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
  const calcItem = document.getElementsByTagName('input[type = number]');
  for(let i = 0; i < calcItem.length; i++){
    calcItem[i].addEventListener('input', () => {
      calcItem[i].value = calcItem[i].value.replace(/[^0-9]/, '');
    });
  }

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      let count = 0;
      let enumNum;

      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if(calcCount.value > 1){
        countValue += (calcCount.value - 1) / 10;
      }

      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5
      }

      if(typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;

      const foo = () => {
        totalValue.textContent = count;
        if (count < total) {
          count +=50;
        } else {
          clearInterval(enumNum);
        }
      };
      enumNum = setInterval(foo, 1);
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if(target.matches('select') || target.matches('input')){
        countSum();
      }
    });
  };
  calc(100);

  // AJAX form

  const sendForm = () => {
    const errorMessage = 'Что то пошло не так...';
    const loadMessage = document.createElement('div');
    const successMessage = 'Спасибо! Мы с Вами свяжемся.';
    const form = document.getElementById('form1');
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.appendChild(loadMessage);
      form.appendChild(statusMessage);
      loadMessage.textContent = loadMessage.classList.add('spinning-square');
      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body)
          .then(() => {
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error)});
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4){
            return;
          }
          if (request.status === 200) {
            resolve();
            form.removeChild(loadMessage);
            form.reset();
          } else {
            form.removeChild(loadMessage);
            reject(request.status);
          }
        });
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(body));
      });
    }
  };
  sendForm();

});