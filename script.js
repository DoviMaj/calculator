function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function divide(a, b){
  return a/b;
}


function multiply (a, b) {
		return a * b
}



let result = '';
let displayOperation = [];
let values = [];
let firstValue = '';
let secondValue = '';
let operatorValue = '';
let operatorToggled = false;
let dotToggled = false;

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

function handleDisplay(){
  let display = document.getElementById('display');
  display.innerHTML = `${displayOperation.join('')}`
  let displayResult = document.getElementById('displayResult');
  displayResult.innerHTML = result;
}


function handleOperatorInput(value){
  if(result === ''){
        operatorToggled = !operatorToggled;
      }
      if(operatorToggled && result !== ''){
        firstValue = result;
        secondValue = ''
        //result = ''
      }
      operatorValue = value;
      displayOperation.push(operatorValue);
      values = [];
      handleDisplay();
      console.log(operatorValue);
      console.log(`values: ${values}`);
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`);
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
      console.log(`displayOperation: ${displayOperation}`)
}

function handleInput(inputValue){
  values.push(inputValue);
  if(!operatorToggled){
    firstValue = values.reduce((a, b) => a + b);
    secondValue = '';
    if(values !== []){
      displayOperation = values;
    }
  }
  else{
    secondValue = values.reduce((a, b) => a + b);
    if(!(/^[0-9]*$/.test(displayOperation[displayOperation.length -2])) 
    && (/^[0-9]*$/.test(displayOperation[displayOperation.length -1]))){
      console.log('hi')
      displayOperation.pop()
    }
    if(displayOperation[displayOperation.length - 1].includes('.')){
      displayOperation.pop()
    }
    displayOperation.push(secondValue);
    handleValues()
  } 
  handleDisplay()
  console.log(`values: ${values}`);
  console.log(`firstValue: ${firstValue}`);
  console.log(`secondValue: ${secondValue}`)
  console.log(`operatorToggled: ${operatorToggled}`);
  console.log(`result: ${result}`)
  console.log(`displayOperation: ${displayOperation}`)
  console.log(`dotToggled: ${dotToggled}`)
}

let ul = document.querySelector('ul');
ul.childNodes.forEach((li) => {
  li.addEventListener('mousedown', (evt) =>{
    if(li.id === 'number'){
     handleInput(li.innerHTML)
    }
    if(li.id === 'operator' && (/^[0-9]*\.?[0-9]*$/.test(displayOperation[displayOperation.length -1]))){
      handleOperatorInput(li.innerHTML)
    }  
    if(li.id === 'clear'){
      displayOperation = [];
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
      console.log(`displayOperation: ${displayOperation}`)
    }
    if(li.id === 'dot'){
      if(!operatorToggled){
        if(!firstValue.includes('.')){
          if((firstValue != '')){
            handleInput(li.innerHTML);
          }
        }
      }
      if(operatorToggled){
              debugger
        if(!secondValue.includes('.')){
          if((secondValue != '')){
            displayOperation.pop()
            handleInput(li.innerHTML);
          }
        }
      }
    }
    if(li.id === 'remove'){
      handleRemove();   
    }
  })
})

function handleRemove(){
   values.pop();
        if(!operatorToggled){
          firstValue = firstValue.slice(0, -1);
          handleDisplay();
        }
        if(operatorToggled){
          displayOperation = displayOperation
            .map((i, index) => (index === displayOperation.length -1)? 
                i.slice(0, -1): i)
          secondValue = secondValue.slice(0, -1);
          handleValues();  
          handleDisplay();
        }
        console.log(`values: ${values}`)
      console.log(`firstValue: ${firstValue}`);
      console.log(`secondValue: ${secondValue}`);
      console.log(`operatorToggled: ${operatorToggled}`);
      console.log(`result: ${result}`)
      console.log(`displayOperation: ${displayOperation}`)
}

window.addEventListener('keydown', function(evt){
  if(evt.code === 'Backspace'){
    handleRemove()
  }
  if(evt.key === '+' &&
   (/^[0-9]*\.?[0-9]*$/.test(displayOperation[displayOperation.length -1]))){
    handleOperatorInput('+')
  }
})


// add click event listener to each number (x)
// console.log value of innerHtml (x)
// store value of clicked element in array (x)
// when clicked on result run the operator with the values (x)
// result inside li (x)
// allow decimal input ()
// support key codes ()
