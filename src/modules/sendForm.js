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
        })
        .catch((error) => console.log(error));
  }
};
export default sendForm;
