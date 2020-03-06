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

export default togglePopUp;