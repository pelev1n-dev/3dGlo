const sendForm = () => {
  const errorMessage = 'Что то пошло не так...';
  const loadMessage = document.createElement('div');
  const successMessage = 'Спасибо! Мы с Вами свяжемся.';
  const form = document.getElementById('form1');
  const formFooter = document.getElementById('form2');
  const formModal = document.getElementById('form3');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';

  const inputName = document.querySelectorAll('input[type = text]');
  const inputMessage = document.querySelector('.mess');

  inputName[0].addEventListener('input', () => {
    inputName[0].value = inputName[0].value.replace(/[^,А-Яа-яЁё\s]/, '');
  });
  inputName[1].addEventListener('input', () => {
    inputName[1].value = inputName[1].value.replace(/[^,А-Яа-яЁё\s]/, '');
  });
  inputName[2].addEventListener('input', () => {
    inputName[2].value = inputName[2].value.replace(/[^,А-Яа-яЁё\s]/, '');
  });

  inputMessage.addEventListener('input', () => {
    inputMessage.value = inputMessage.value.replace(/[^,А-Яа-яЁё\s]/, '');
  });

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
    postData(body);
  });

  const postData = () => {
    fetch('server.php')
        .then((response) => {
          if (response.status !== 200){
            statusMessage.textContent = errorMessage;
            form.removeChild(loadMessage);
            throw new Error('status network not 200.');
          }
          return(response.text());
        })
        .then((data) => {
          statusMessage.textContent = successMessage;
          form.removeChild(loadMessage);
          form.reset();
          setTimeout(() => {
            form.removeChild(statusMessage);
          }, 5000);
        })
        .catch((error) => console.log(error));
  };

};
export default sendForm;
