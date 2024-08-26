// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : "Error"; // Avoid dividing by zero

// Operate function to handle basic operations
const operate = (operator, num1, num2) => {
    const operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide
    };
    return operations[operator] ? operations[operator](num1, num2) : "Invalid operator";
};

// Variables to track calculator state
const display = document.querySelector('#display');
let currentInput = '';
let firstNumber = null;
let operator = null;
let decimalAdded = false;

// Update display function
const updateDisplay = (value) => display.textContent = value || '0';

// Handle number input
const handleNumberInput = (num) => {
    currentInput += num;
    updateDisplay(currentInput);
};

// Handle operator input
const handleOperatorInput = (op) => {
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
        currentInput = '';
    }
    operator = op;
    decimalAdded = false;
};

// Handle equals operation
const handleEquals = () => {
    if (firstNumber !== null && operator && currentInput) {
        const result = operate(operator, firstNumber, parseFloat(currentInput));
        updateDisplay(result);
        firstNumber = result;
        operator = null;
        currentInput = '';
        decimalAdded = false;
    }
};

// Handle clear operation
const handleClear = () => {
    currentInput = '';
    firstNumber = null;
    operator = null;
    decimalAdded = false;
    updateDisplay('0');
};

// Handle decimal input
const handleDecimal = () => {
    if (!decimalAdded) {
        currentInput += '.';
        updateDisplay(currentInput);
        decimalAdded = true;
    }
};

// Handle backspace operation
const handleBackspace = () => {
    currentInput = currentInput.slice(0, -1);
    if (currentInput.endsWith('.')) decimalAdded = false;
    updateDisplay(currentInput);
};

// Event listeners
document.querySelectorAll('.number').forEach(button =>
    button.addEventListener('click', () => handleNumberInput(button.textContent))
);

document.querySelectorAll('.operator').forEach(button =>
    button.addEventListener('click', () => handleOperatorInput(button.textContent))
);

document.querySelector('.equals').addEventListener('click', handleEquals);
document.querySelector('.clear').addEventListener('click', handleClear);
document.querySelector('.decimal').addEventListener('click', handleDecimal);
document.querySelector('.backspace').addEventListener('click', handleBackspace);

// Keyboard input handler
document.addEventListener('keydown', (event) => {
    const { key } = event;

    if (!isNaN(key)) {
        handleNumberInput(key);
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (key === 'Enter') {
        handleEquals();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorInput(key);
    } else if (key === 'Escape') {
        handleClear();
    }
});
