class Validate {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    });
    this.error = new Set();
  }

  init(){
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size){
        e.preventDefault();
      }
    });
  }

  isValid(elem){
    const validateMethod = {
      notEmpty(elem){
        if (elem.value.trim() === ''){
          return false;
        }
        return true;
      },
      pattern(elem, pattern){
        return pattern.test(elem.value);
      }
    };

    if (this.method){
      const method = this.method[elem.id];

      if (method){
        return method.every(item => validateMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }

    return true;
  }

  checkIt(event){
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem){
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validate-error')){
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validate-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem){
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validate-error')){
      elem.nextElementSibling.remove();
    }
  }

  applyStyle(){
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green
      }
      input.error {
        border: 2px solid red
      }
      .validate-error {
        font-size: 14px;
        color: red;
        margin-top: -25px;
      }   
    `;
    document.head.appendChild(style);
  }

  setPattern(){
    if (!this.pattern.phone){
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email){
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}