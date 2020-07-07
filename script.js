function add (n1, n2) {
	return n1 + n2;
}

function subtract (n1, n2) {
	return n1 - n2;
}

function divide(a, b){
  return a/b;
}


function multiply (a, b) {
		return a * b
}



let result = '';
let values = [];
let firstValue = '';
let secondValue = '';
let operatorValue = '';
let operatorToggled = false;
let wasToglledOnce = false;
function handleOperator(op){
  return ((op === '+') ? add : (op === '-') ? subtract : 
  (op === '÷') ? divide : (op === 'x') ? multiply : null)
}

let obj = {};
function handleValues(){
  obj = {
    operator: handleOperator(operatorValue),
    a: Number(firstValue),
    b: Number(secondValue)
  } 
  operator(obj.operator, obj.a, obj.b);
}



function operator(operator, a, b){
  result = Number(operator(a, b));
  return result
}

let ul = document.querySelector('ul');
ul.childNodes.forEach((li) => {
  li.addEventListener('mouseup', (evt) =>{
    //debugger
    if(li.id === 'number'){
      values.push(li.innerHTML);
      if(!operatorToggled){
        firstValue = values.reduce((a, b) => a + b);
        secondValue = '';
      }
      else{
        secondValue = values.reduce((a, b) => a + b);
        handleValues()
      } 
      handleDisplay()
      console.log(`values: ${values}`);
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`)
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
    }
    if(li.id === 'operator'){
      if(result === ''){
        operatorToggled = !operatorToggled;
      }
      if(operatorToggled && result !== ''){
        firstValue = result;
        secondValue = ''
        result = ''
      }
      operatorValue = li.innerHTML;
      values = [];
      handleDisplay();
      console.log(operatorValue);
      console.log(`values: ${values}`);
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`);
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
    }
    if(li.id === 'result'){
      if(secondValue !== ''){
        operatorToggled = !operatorToggled;
      }
      if(result !== ''){
        firstValue = result;
        secondValue = ''
        operatorValue = ''
        result = '';
      }
      handleDisplay();
      console.log(`values: ${values}`)
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`);
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
    }
    if(li.id === 'clear'){
      values = [];
      operatorToggled = false;
      operatorValue = '';
      firstValue = '';
      secondValue = '';
      result = '';
      handleDisplay();
      console.log(`values: ${values}`)
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`);
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
    }
  })
})

function handleDisplay(){
  //debugger
  let valueOne = document.getElementById('firstValue');
  valueOne.innerHTML = firstValue;
  let valueTwo = document.getElementById('secondValue');
  valueTwo.innerHTML = secondValue;
  let displayOperator = document.getElementById('displayOperator');
  displayOperator.innerHTML = operatorValue;
  let displayResult = document.getElementById('displayResult');
  displayResult.innerHTML = result;
}



// add click event listener to each number (x)
// console.log value of innerHtml (x)
// store value of clicked element in array (x)
// when clicked on result run the operator with the values (x)
// allow decimal input (x)
// result inside li (x)

