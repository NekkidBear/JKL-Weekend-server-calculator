console.log("client.js is sourced!");

let operator = "";
let numOne = "";
let numTwo = "";
let calculations = [];

/** this function will render the updated data in the DOM */
async function renderDOM() {
  console.log("in renderDOM");
  await fetchCalcs(); //fetch incoming data and store it in calculations array
  console.log(calculations);

  //display the result of the current function
  let recentResultLocation = document.getElementById("recentResult"); //create reference to the DOM element

  if (calculations.length > 0 && recentResultLocation) {
    console.log(calculations[calculations.length - 1].result);
    recentResultLocation.innerText =
      calculations[calculations.length - 1].result;
  }

  //display the history of the calculations
  let calcHistoryULlocation = document.getElementById("calcHistoryUL");
  let calcHistoryHTML = ""; //initialize the string
  for (let calc of calculations) {
    console.log(calc);

    calcHistoryHTML += `
        <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>`;
  }
  if (calcHistoryULlocation) {
    calcHistoryULlocation.innerHTML = calcHistoryHTML;
  }
  //clear the inputs for another calculation
  calcClear();
}
//****************************** *//
//Operation buttons
//****************************** */

/** this function sets the calculation operator to '+' */
function calcAdd(event) {
  event.preventDefault();
  console.log("add");
  operator = "+";
}

/** this function sets the calculation operator to '-' */
function calcSubtract(event) {
  event.preventDefault();
  console.log("subtract");
  operator = "-";
}

/** this function sets the calculation operator to '*' */
function calcMultiply(event) {
  event.preventDefault();
  console.log("multiply");
  operator = "*";
}

/** this function sets the calculation operator to '*' */
function calcDivide(event) {
  event.preventDefault();
  console.log("divide");
  operator = "/";
}

//****************************** */
//execution buttons
//****************************** */
/** this function generates the POST request to trigger the calculations on the server  */
function calcEquals(event) {
  console.log("equals");
  event.preventDefault();
  //create data object
  numOne = document.getElementById("numOne").value;
  console.log("numOne is", numOne);
  numTwo = document.getElementById("numTwo").value;
  console.log("numTwo is", numTwo);
  //operator is set by the calc buttons
  console.log("operator is", operator);

  // send post request with calculation to perform
  console.log("Sending POST to server");
  axios({
    method: "POST",
    url: "/calculations",
    data: { numOne: numOne, numTwo: numTwo, operator: operator },
  }).then((res) => {
    renderDOM();
    calcClear();
  });
}

/** this function clears the inputs '+' */
function calcClear(event) {
  if (event) {
    event.preventDefault();
  }
  console.log("clearing inputs");

  //selecting the inputs in the DOM
  numOneinput = document.getElementById("numOne");
  numTwoinput= document.getElementById("numTwo");

  //clearing the inputs
  numOneInput.value = "";
  numTwoInput.value = "";
  operator = "";

  console.log("inputs are clear");
}

/** this function will fetch the new data and trigger a DOM refresh*/
async function fetchCalcs() {
  console.log("fetching data");
  // GET request
  await axios({
    method: "GET",
    url: "/calculations",
  })
    .then((res) => {
      calculations = res.data; //update the calculations array with the incoming data
      console.log(res.data);
      console.log(calculations);
    })
    .catch((error) => {
      console.log("Error fetching data", error);
    });
}

//on initial load
window.onload = renderDOM();
