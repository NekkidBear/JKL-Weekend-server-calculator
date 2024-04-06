const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [
  {
    numOne: 4, 
    num2: 10, 
    operator: "+", 
    result: 14},
  {
    numOne: 3,
    numTwo: 5,
    operator: '+',
    result: 8
  },
  {
    numOne: 11,
    numTwo: 7,
    operator: '-',
    result: 4
  } //dummy data for testing
]


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req,res) => {
  res.send(calculations);
})

// POST /calculations
app.post('/calculations', (req, res) => {
  let calc = res.body;
  calculate(calc); //function to calculate the result from the posted inputs
  calculations.push(calc);
  res.sendStatus(201)
})

function calculate(calc){
  let numOne = Number(calc.numOne); //store the first number
  let numTwo = Number(calc.numTwo); //store the second number
  let operator = calc.operator; //store the operator
  let result = 0; //initialize result

  switch (operator){
    case '+':
      result = numOne + numTwo;
      break;
    case '-':
      result = numOne - numTwo;
      break;
    case '*':
      result = numOne * numTwo;
      break;
    case '/':
      result = numOne / numTwo;
      break;
  }
  calc.result = result; // add the result property into the calculation object
  return calc
  
}

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
