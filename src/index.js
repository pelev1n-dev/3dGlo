'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

// Timer
setInterval(countTimer, 1000, '18 february 2020 22:07:00');
countTimer('18 february 2020 22:07:00');

// Menu
toggleMenu();

// PopUp (modal window)
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
tabs();

// Slider
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
calc(100);

// AJAX send form
sendForm();