"use strict";
// Find DOM element once rather than finding each time on use.
const calcForm = document.getElementById("calc-form");
const amountInput = document.getElementById("loan-amount");
const yearsInput = document.getElementById("loan-years");
const rateInput = document.getElementById("loan-rate");
const reset = document.getElementById("reset-page");
const resultArea = document.getElementById("calc-monthly-payment");
const resultHistory = [];
/** Retrieve form values.
 *
 * Example output: an object like {"amount": 10000, "years": 10, "rate": 4.5}.
 *
 * */
function getFormValues() {
    let amount = Number(amountInput.value);
    let years = Number(yearsInput.value);
    let rate = Number(rateInput.value);
    if (checkFormValues([amount, years, rate]) === true) {
        return {
            amount: amount,
            years: years,
            rate: rate,
        };
    }
    resultArea.innerText = "Inputs must be numbers";
}
/** Takes the form input data and returns true if all values are valid numbers,
 * else returns false
 */
function checkFormValues(data) {
    for (let value of data) {
        if (isNaN(value) === true) {
            return false;
        }
    }
    return true;
}
/** Calculate monthly payment and return. */
function calcMonthlyPayment({ amount, years, rate }) {
    const monthsInYear = 12;
    const monthlyRate = (rate / 100) / monthsInYear;
    const n = Math.floor(years * monthsInYear);
    return ((monthlyRate * amount) /
        (1 - Math.pow((1 + monthlyRate), -n)));
}
/** Get form values, calculate, format to 2 decimal places, and display. */
function getFormValuesAndDisplayResults() {
    const { amount, years, rate } = getFormValues();
    const payment = calcMonthlyPayment({ amount, years, rate });
    resultHistory.push({ amount, years, rate, payment });
    resultArea.innerText = "$" + payment.toFixed(2);
}
/** Set initial form values and show initial results. Called at app start. */
function setInitialValues() {
    amountInput.value = "10000";
    yearsInput.value = "10";
    rateInput.value = "4.5";
    getFormValuesAndDisplayResults();
}
/** Start: set form defaults & display; attach form submit event listener. */
function start() {
    setInitialValues();
    calcForm.addEventListener("submit", function (evt) {
        evt.preventDefault();
        getFormValuesAndDisplayResults();
    });
}
//TODO: why does the callback function in the eventlistener not have a "void" type
/** Resets form to default */
function clearFormFeilds() {
    calcForm.reset();
    resultArea.innerHTML = "";
}
reset.addEventListener("click", function (evt) {
    evt.preventDefault();
    clearFormFeilds();
});