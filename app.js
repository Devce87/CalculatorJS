class Calculator {

    constructor(previousInputText, currentInputText){
        this.previousInputText = previousInputText
        this.currentInputText = currentInputText
        this.clear()
    }

    clear(){
        this.currentInput = "";
        this.previousInputText = "";
        this.operation = null;
    }

    appendNumber(number){
        if(number === "." && this.currentInput.includes(".")) return;
        if(this.currentInput !== "" && this.previousInputText !== "" && this.operation === undefined){
            this.clear()
        }
        this.currentInput = this.currentInput.toString() + number.toString()
    }
   
    chooseOperation(operation){ 
        if(this.operation === undefined ||this.operation === null){
            this.operation = operation;
            this.compute();
        } 

        if(this.operation !== operation && this.previousInputText !== ""){
            this.compute()
            this.operation = operation;
        }
    
        if(this.currentInput ==="") return
        
        this.previousInputText = this.currentInput;
        this.currentInput = "";
        
    }

    compute(){
        let calculate;
        const previous = this.previousInputText;
        const current = this.currentInput;

        if(previous==="" || current==="") return;
        switch (this.operation){
               case "+":
                    calculate = parseFloat(previous) + parseFloat(current);
                    break;

                case "-":
                    calculate = parseFloat(previous) - parseFloat(current);
                    break;
                
                case "×":
                     calculate = parseFloat(previous) * parseFloat(current);
                    break;

                case "÷":
                    calculate = parseFloat(previous) / parseFloat(current);
                    break;    
                           
                default: 
                return;
        }

        let result = previous+this.operation+this.currentInput+" = "+calculate;
        let store_JSON = JSON.stringify({result});
        localStorage.setItem(((localStorage.length)+1),store_JSON);

        this.currentInput = calculate;
        this.operation =  undefined;
    }

    updateDisplay(){

        if(this.currentInput === "" && this.previousInputText !==""){
            this.currentInputText.innerText = this.previousInputText;
        } else {
            this.currentInputText.innerText = this.currentInput;
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const allClearButton = document.querySelector("[data-clear-all]")
const equalButton = document.querySelector("[data-equal]")
const currentInputText = document.querySelector("[data-current-input]")
var previousInputText = "";

const calculator = new Calculator(previousInputText, currentInputText)

numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()

})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        showTable();

    })
})

equalButton.addEventListener('click', ()=> {
    calculator.compute()
    calculator.updateDisplay()
    showTable();
})


function showTable(){
    let body = document.createElement('tbody');
    body.id = 'history-body';
    for(index=0; index<localStorage.length;index++){
        const key =  localStorage.key(index);
        const value =  {result}= JSON.parse(localStorage.getItem(key));

        let keyColumn = document.createElement('td');
        let resultColumn = document.createElement('td');
        let actionColumn = document.createElement('td');
        let deleteColumn = document.createElement('button');

        let row = document.createElement('tr');

        keyColumn.textContent =  key;
        resultColumn.textContent = result;
        deleteColumn.textContent = "Delete";
        deleteColumn.onclick = function (){
            localStorage.removeItem(key);
            showTable();
        }

        actionColumn.appendChild(deleteColumn);
        row.appendChild(keyColumn);
        row.appendChild(resultColumn);
        row.appendChild(actionColumn);
        body.appendChild(row);


    }
    document.getElementById('history-body').replaceWith(body);

}

window.onload = showTable();