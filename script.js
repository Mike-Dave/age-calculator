"use strict";

// Selecting HTML elements
const calcDateBtn = document.getElementById("calc-date-btn");
const dayInput = document.getElementById("day-input-area");
const monthInput = document.getElementById("month-input-area");
const yearInput = document.getElementById("year-input-area");

const yearText = document.getElementById("year-text");
const monthText = document.getElementById("month-text");
const dayText = document.getElementById("day-text");

const dayHeading = document.getElementById("day-heading");
const monthHeading = document.getElementById("month-heading");
const yearHeading = document.getElementById("year-heading");

const dayErrorMsg = document.getElementById("day-error-msg");
const monthErrorMsg = document.getElementById("month-error-msg");
const yearErrorMsg = document.getElementById("year-error-msg");

let nowYear;

const ageCalculator = function (dateOfBirth) {
  const now = new Date();
  nowYear = new Date().getFullYear();
  const birthDate = new Date(dateOfBirth);
  //   You can remove this code, just added to stop displyaing NaN for when the yearInput is for example 22 (invalid date)
  if (
    isNaN(birthDate.getDate()) ||
    isNaN(birthDate.getMonth() + 1) ||
    isNaN(birthDate.getFullYear())
  ) {
    return { year: 0, month: 0, day: 0 };
  }

  let year = now.getFullYear() - birthDate.getFullYear();
  let month = now.getMonth() - birthDate.getMonth();
  let day = now.getDay() - birthDate.getDay();

  if (month < 0 || (month === 0 && day < 0)) {
    year--;
    month += 12;
  }

  if (day < 0) {
    let lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
    day += lastMonth.getDate();
    month--;
  }

  return { year, month, day };
};

// Helper functions
const errorMessageDisplay = function (error) {
  error.classList.remove("hidden");
};

const errorAddRedColor = function (element, errorStyle) {
  element.classList.add(`${errorStyle}`);
};

const ageCalculatorDisplay = function () {
  let dayInputValue = dayInput.value;
  let monthInputValue = monthInput.value;
  let yearInputValue = yearInput.value;

  const calculatedDate = ageCalculator(
    `${yearInputValue} ${monthInputValue} ${dayInputValue}`
  );

  //   To add errors when input is empty
  if (dayInputValue === "") {
    errorMessageDisplay(dayErrorMsg);
    errorAddRedColor(dayHeading, "error--color");
    errorAddRedColor(dayInput, "border--error");
  }
  if (monthInputValue === "") {
    errorMessageDisplay(monthErrorMsg);
    errorAddRedColor(monthHeading, "error--color");
    errorAddRedColor(monthInput, "border--error");
  }
  if (yearInputValue === "") {
    errorMessageDisplay(yearErrorMsg);
    errorAddRedColor(yearHeading, "error--color");
    errorAddRedColor(yearInput, "border--error");
  }

  //   To check for invalid dates
  if (dayInputValue > 31) {
    errorMessageDisplay(dayErrorMsg);
    errorAddRedColor(dayHeading, "error--color");
    errorAddRedColor(dayInput, "border--error");
    dayErrorMsg.innerHTML = "Must be a valid day";
  } else if (monthInputValue > 12) {
    errorMessageDisplay(monthErrorMsg);
    errorAddRedColor(monthHeading, "error--color");
    errorAddRedColor(monthInput, "border--error");
    monthErrorMsg.innerHTML = "Must be a valid month";
  } else if (yearInputValue > nowYear) {
    errorMessageDisplay(yearErrorMsg);
    errorAddRedColor(yearHeading, "error--color");
    errorAddRedColor(yearInput, "border--error");
    yearErrorMsg.innerHTML = "Must be in the past";
  } else {
    dayText.innerHTML = calculatedDate.day;
    monthText.innerHTML = calculatedDate.month;
    yearText.innerHTML = calculatedDate.year;
  }

  if (yearInputValue === "" || monthInputValue === "" || dayInputValue === "") {
    dayText.innerHTML = "--";
    monthText.innerHTML = "--";
    yearText.innerHTML = "--";
  }

  // To check for months with 30 days
  if (
    (Number(monthInput.value) === 4 ||
      Number(monthInput.value) === 6 ||
      Number(monthInput.value) === 9 ||
      Number(monthInput.value) === 11) &&
    dayInput.value > 30
  ) {
    errorMessageDisplay(dayErrorMsg);
    dayErrorMsg.innerHTML = "Must be a valid date";
  }
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
};

calcDateBtn.addEventListener("click", ageCalculatorDisplay);

// To remove error colors and text when a user re-enters an input
dayInput.addEventListener("keydown", function () {
  dayErrorMsg.classList.add("hidden");
  dayHeading.classList.remove("error--color");
  dayInput.classList.remove("border--error");
});
monthInput.addEventListener("keydown", function () {
  monthErrorMsg.classList.add("hidden");
  monthHeading.classList.remove("error--color");
  monthInput.classList.remove("border--error");
});
yearInput.addEventListener("keydown", function () {
  yearErrorMsg.classList.add("hidden");
  yearHeading.classList.remove("error--color");
  yearInput.classList.remove("border--error");
});
