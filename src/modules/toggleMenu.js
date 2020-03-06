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

export default toggleMenu;