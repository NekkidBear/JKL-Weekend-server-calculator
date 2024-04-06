console.log("client.js is sourced!");

let operator = "";
let numOne = "";
let numTwo = "";
let calculations = [];

/** this function triggers on intial page load to get the initial data fromt the server */
// function onLoad(){
//   console.log("in onLoad()");
//   calculations = fetchCalcs();
//   console.log(calculations.at(-1).numOne, calculations.at(-1).numTwo, calculations.at(-1).operator);
//   renderDOM(calculations);
// }

/** this function will render the updated data in the DOM */
function renderDOM() {
  console.log("in renderDOM");
  calculations.push(fetchCalcs()); //fetch incoming data and store it in calculations
  console.log(calculations);
  //display the result of the current function
  let recentResultLocation = document.getElementById("recentResult");
  console.log(calculations[calculations.length - 1].result);
  recentResultLocation.innerHTML.text =
    calculations[calculations.length - 1].result;
  //display the history of the calculations
  let calcHistoryULlocation = document.getElementById("calcHistoryUL");
  for (let calc of calculations) {
    console.log(calc);
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
  });
}

/** this function clears the inputs '+' */
function calcClear(event) {
  event.preventDefault();
  console.log("clearing inputs");
  numOne = document.getElementById("numOne").value;
  numTwo = document.getElementById("numTwo").value;

  numOne = "";
  numTwo = "";
  operator = "";

  console.log("inputs are clear");
}

/** this function will fetch the new data and trigger a DOM refresh*/
// function fetchCalcs() {
//   console.log("fetching data");
//   // GET request
//   axios({
//     method: "GET",
//     url: "/calculations",
//   }).then((res) => {
//     let calculations = res.calculations;
//     console.log(res.data);
//     console.log(calculations);
//     return calculations;
//   });
// }

async function fetchCalcs() {
    try {
      const response = await fetch('/calculations');
      if (response.ok) {
        const data = await response.json();
        calculations = data; // Assign the fetched data directly to the calculations variable
      } else {
        console.error('Error fetching calculations:', response.status);
      }
    } catch (error) {
      console.error('Error fetching calculations:', error);
    }
  }

//on initial load
window.onload = renderDOM();
