const sendForm = () => {
  const errorMessage = 'Что то пошло не так...';
  const loadMessage = document.createElement('div');
  const successMessage = 'Спасибо! Мы с Вами свяжемся.';
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: white';

  const inputName = document.querySelectorAll('input[type = text]');
  const inputMessage = document.querySelector('.mess');

  inputName[0].addEventListener('input', () => {
    inputName[0].value = inputName[0].value.replace(/[^,А-Яа-яЁё\s]/g, '');
  });
  inputName[1].addEventListener('input', () => {
    inputName[1].value = inputName[1].value.replace(/[^,А-Яа-яЁё\s]/g, '');
  });
  inputName[2].addEventListener('input', () => {
    inputName[2].value = inputName[2].value.replace(/[^,А-Яа-яЁё\s]/g, '');
  });

  inputMessage.addEventListener('input', () => {
    inputMessage.value = inputMessage.value.replace(/[^,А-Яа-яЁё\s]/g, '');
  });

  const inputTel = document.querySelectorAll('input[type = tel]');

  inputTel[0].addEventListener('input', () => {
    inputTel[0].value = inputTel[0].value.replace(/[^\+0-9]/g,'')
  });

  inputTel[1].addEventListener('input', () => {
    inputTel[1].value = inputTel[1].value.replace(/[^\+0-9]/g,'')
  });

  inputTel[2].addEventListener('input', () => {
    inputTel[2].value = inputTel[2].value.replace(/[^\+0-9]/g,'')
  });

  const inputMail = document.querySelectorAll('input[type = email]');

  const forms = document.querySelectorAll('form');

  forms.forEach((form, i, arr) => {
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
      postData(body, form);
    });
  });

  const postData = (body, form) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    };
    statusMessage.textContent = '';
    fetch('server.php', options)
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
          setTimeout(() => {
            form.removeChild(statusMessage);
          }, 2000);
          form.reset();
        })
        .catch((error) => console.log(error));
  };

};
export default sendForm;
