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

export default calc;