console.log("client.js is sourced!");

let operator = "";
let numOne = "";
let numTwo = "";

/** this function triggers on intial page load to get the initial data fromt the server */
function onReady() {
  fetchCalcs();
  renderDOM(calculations);
}

/** this function will render the updated data in the DOM */
function renderDOM(calculations) {
  //display the result of the current function
  let recentResultLocation = document.getElementById("recentResult");
  recentResultLocation.textContent = calculations.at(-1).result;
  //display the history of the calculations
  let calcHistoryULlocation = document.getElementById("calcHistoryUL");
  for (let calc of calculations) {
    calcHistoryULlocation += `
        <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>`;
  }
  //clear the inputs for another calculation
  calcClear();
}
//****************************** *//
//Operation buttons
//****************************** */

/** this function sets the calculation operator to '+' */
function calcAdd(event) {
  operator = "+";
}

/** this function sets the calculation operator to '-' */
function calcSubtract(event) {
  operator = "-";
}

/** this function sets the calculation operator to '*' */
function calcMultiply(event) {
  operator = "*";
}

/** this function sets the calculation operator to '*' */
function calcDivide(event) {
  operator = "/";
}

//****************************** */
//execution buttons
//****************************** */
/** this function generates the POST request to trigger the calculations on the server  */
function calcEquals(event) {
  //create data object
  numOne = document.getElementById("numOne").value;
  numTwo = document.getElementById("numTwo").value;
  //operator is set by the calc buttons

  // send post request with calculation to perform
  axios({
    method: "POST",
    url: "/calculations",
    data: { numOne: numOne, numTwo: numTwo, operator: operator },
  });
}

/** this function clears the inputs '+' */
function calcClear(event) {
    numOne = document.getElementById("numOne").value;
    numTwo = document.getElementById("numTwo").value;

    numOne = '';
    numTwo = '';
    operator = '';
}

/** this function will fetch the new data */
function fetchCalcs() {
  // GET request
  axios({
    method: "GET",
    url: "/calculations",
  }).then((res) => {
    let calculations = res.calculations;
    return calculations;
  });
}
