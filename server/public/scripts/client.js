console.log('client.js is sourced!');

let operator = '';

/** this function will render the updated data in the DOM */
function renderDOM(){
    //todo
}
//****************************** *//
//Operation buttons
//****************************** */

/** this function sets the calculation operator to '+' */
function calcAdd(event){
    operator= '+';
}

/** this function sets the calculation operator to '-' */
function calcSubtract(event){
    operator= '-';
}

/** this function sets the calculation operator to '*' */
function calcMultiply(event){
    operator= '*';
}

/** this function sets the calculation operator to '*' */
function calcDivide(event){
    operator= '/';
}

//****************************** */
//execution buttons
//****************************** */
/** this function generates the POST request to trigger the calculations on the server  */
function calcEquals(event){
    //todo POST request
}

/** this function sets the calculation operator to '+' */
function calcClear(event){
    //todo
}

/** this function will fetch the new data */
function fetchCalcs(){
    //todo GET request


