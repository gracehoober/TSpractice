"use strict";
// Find DOM element once rather than finding each time on use.
const calcForm = document.getElementById("calc-form") as HTMLFormElement;
const amountInput = document.getElementById("loan-amount") as HTMLInputElement;
const yearsInput = document.getElementById("loan-years") as HTMLInputElement;
const rateInput = document.getElementById("loan-rate") as HTMLInputElement;
const reset = document.getElementById("reset-page") as HTMLButtonElement;
const resultArea = document.getElementById("calc-monthly-payment") as HTMLSpanElement;
//TODO: in solution the bang operator is used fofr resultArea instead of HTMLSpan element. Why?

const resultHistory: { amount: number; years: number; rate: number; payment: number; }[] = [];
/** Retrieve form values.
 *
 * Example output: an object like {"amount": 10000, "years": 10, "rate": 4.5}.
 *
 * */

function getFormValues(): { amount: number; years: number; rate: number; } {
  return {
    amount: Number(amountInput.value),
    years: Number(yearsInput.value),
    rate: Number(rateInput.value),
  };

}

/** Calculate monthly payment and return. */

function calcMonthlyPayment(
  { amount, years, rate }: { amount: number; years: number; rate: number; }
): number {
  const monthsInYear = 12;
  const monthlyRate = (rate / 100) / monthsInYear;
  const n = Math.floor(years * monthsInYear);
  return (
    (monthlyRate * amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  );
}

/** Get form values, calculate, format to 2 decimal places, and display. */

function getFormValuesAndDisplayResults(): void {
  const { amount, years, rate } = getFormValues();
  const payment = calcMonthlyPayment({ amount, years, rate });
  resultHistory.push({ amount, years, rate, payment });
  resultArea.innerText = "$" + payment.toFixed(2);
}

/** Set initial form values and show initial results. Called at app start. */

function setInitialValues(): void {
  amountInput.value = "10000";
  yearsInput.value = "10";
  rateInput.value = "4.5";
  getFormValuesAndDisplayResults();
}

/** Start: set form defaults & display; attach form submit event listener. */

function start(): void {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt): void {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}
//TODO: why does the callback function in the eventlistener not have a "void" type

/** Resets form to default */
function clearFormFeilds(): void {
  calcForm.reset();
  resultArea.innerHTML = "";
}

reset.addEventListener("click", function (evt): void {
  evt.preventDefault();
  clearFormFeilds();
});
