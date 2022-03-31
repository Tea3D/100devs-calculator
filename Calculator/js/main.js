// create a class to hold the current number, previous number, and multiple operations that the operation buttons will need
// including clear, delete, append (creating multiple digit numbers), and mathematical operations
class Calculator {
    //here we will set the javascript values of our previousOperandTextElement to the previousOperandTextElement that belongs to THIS class/constructor
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    } 

    // clear will remove any numerical values currently in the previousOperandTextElement or the currentOperandTextElement
    // it will also clear the operation taking place
    // essentially providing a clean slate for the calculator
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // append will allow for multiple digits numbers in our operands
    // they will be converted to strings to prevent the sum of the numbers to create a sum
    // instead of 1+1=2, it will be '1' + '1' = '11', because they are joining strings
    appendNumber(number) {
        // we will check for the input if it is a .
        // and ensure there is not already a . included in our currentOperand (you do not put multiple decimals in a decimal number)
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // without the line below, if an operation button is pressed, it will continue to add the operation
        // instead we need to check if the currentOperand (the first number) is empty
        // we'll default to return
        if (this.currentOperand === ' ') return

        // alternatively, we can check if the previousOperand is not empty (as in a second number has been entered), and run the compute()
        if (this.previousOperand !== ' ') {
            this.compute()
        }
        
        // if a button with the data-operation attribute is pressed, that operation will be set to the operation within this context
        this.operation = operation;

        // if after the operation is pressed, a number is also pressed, the previousOperand will reflect the number that was pressed
        // for example, you press 2 (displayed in the currentOperandTextElement), then press +, and then press 3.
        // the previousOperandTextElement replace itself with 2, and the currentOperandTextElement will replace itself with an empty string once you press 3
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        // the result of the compute()
        let computation;
        // converts the string of the previousOperand to a number, using parseFloat
        const prev = parseFloat(this.previousOperand)
        // converts the string of the currentOperand to a number, using parseFloat
        const current = parseFloat(this.currentOperand)
        // if prev or current has not been converted to a number, don't do anything
        if (isNaN(prev) || isNaN(current)) return

        // inside of the switch, we will check which kind of operator the user has pressed
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }


        // allows the user to take the computation and build operations on top of it, after it's been computed
        this.currentOperand = computation;
        // clears the operation of any specific function
        this.operation = undefined;
        // resets the previousOperand to a string, which if the computation is built off of, the previousOperand will assume the value of the computation (creates a cycle for the calculcator)
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        // converts the displayed number into a string
        const stringNumber = number.toString()
        // separates the start of the number string into a left-side float (before the decimal)
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // then separates any numbers following the decimals into their own variable (not yet a number)
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        // checks if the first half of the decimal is a number
        if (isNaN(integerDigits)) {
            // if it's NaN, display as an empty string
            integerDisplay = ''
        }
        else {
            // otherwise using english (???), display it as a string with a maximumFractionDigits (how many decimal places a decimal can contain, using 0 to 20)
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        // if we have any decimals digits, display the current or previous operand as the following format
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            // otherwise, only display the integerDisplay (without any display of the decimalDigits)
            return integerDisplay
        }
    }

    updateDisplay() {
        // updateDisplay() will set the innerText property of the currentTextElement to be equal to the currentOperand number
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        // updateDisplay() will set the innerText property of the previousOperandTextELement to be equal to the previousOperand number
        // this.previousOperandTextElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        // otherwise the previousOperandTextElement will remain empty
        // it will also clear when pressing the all-clear button
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')

const operationButtons = document.querySelectorAll('[data-operation]')

const equalButton = document.querySelector('[data-equals]')

const deleteButton = document.querySelector('[data-delete]')

const allClearButton = document.querySelector('[data-all-clear]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)



// the forEach loop will cycle through all the buttons with the data attribute data-number and single it down to the button that was clicked, while running the appendNumber() (and in turn, registering the innerText to retrieve the button's number value), while also running the updateDisplay() to update the currentOperandTextElement
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// we will repeat a similar process for the operation buttons, replacing the appendNumber() with chooseOperation()
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})