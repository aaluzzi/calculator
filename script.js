let storedOperator = null;
let storedNum = 0;

function getNumDisplayed() {
    return parseFloat(document.getElementById("display").textContent);
}

function setNumDisplayed(num) {
    document.getElementById("display").textContent = num;
}

function onOperatorButton(operator) {
    if (storedOperator) {
        if (storedOperator === divide && getNumDisplayed() === 0) {
            window.alert("nice try guy");
            setNumDisplayed(storedNum);
            storedOperator = operator;
            return;
        } else {
            setNumDisplayed(operate(storedOperator, storedNum,  getNumDisplayed()));
        }
    }
    storedNum = getNumDisplayed();
    storedOperator = operator;
}

function onNumButton(num) {
    //we have an operator and the number displayed both stored, so let them enter a new number
    if (getNumDisplayed() === 0 || (storedOperator && storedNum === getNumDisplayed())) {
        setNumDisplayed(num);
    //otherwise continue adding onto the number displayed until an operator button is pressed (and it gets stored)
    } else if (getNumDisplayed().toString().length < 10) {
        document.getElementById("display").textContent += num;
    }
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

document.querySelectorAll(".number").forEach(button => button.addEventListener("click", e => onNumButton(e.target.textContent)));

document.getElementById("add").addEventListener("click", () => onOperatorButton(add));
document.getElementById("subtract").addEventListener("click", () => onOperatorButton(subtract));
document.getElementById("multiply").addEventListener("click", () => onOperatorButton(multiply));
document.getElementById("divide").addEventListener("click", () => onOperatorButton(divide));

document.getElementById("equals").addEventListener("click", () => onOperatorButton(null)); //clever use
document.getElementById("clear").addEventListener("click", () => {
   storedOperator = null;
   storedNum = 0;
   setNumDisplayed(0); 
});