const ageCalculator = function () {
  let emptyOk = true;
  let monthOk = true;
  let yearOk = true;
  let dayOk = true;
  let ageDay;
  let ageMonth;
  let ageYears;
  const yourDay = document.querySelector("#day").value;
  const yourMonth = document.querySelector("#month").value;
  const yourYear = document.querySelector("#year").value;
  const errMsg = document.querySelectorAll(".error-msg");
  //////////////// error msg ///////////////////
  if (yourDay === "" || yourMonth === "" || yourYear === "") {
    renderError();
    emptyOk = false;

    errMsg.forEach((msg) => {
      msg.innerHTML = "This field is required";
    });
  }
  /////////////////////////////////////////
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  //////////////logic/////////////////////
  if (yourDay <= day) {
    ageDay = day - yourDay;
  } else {
    ageDay = 31 - yourDay + day;
  }
  //////////////// error msg ///////////////////
  if (+yourDay > 31) {
    errMsg[0].innerHTML = "Must be a valid date";
    renderError();
    dayOk = false;
  } else if (+yourMonth === 2 && +yourDay > 29) {
    errMsg[0].innerHTML = "Must be a valid date";
    renderError();
    dayOk = false;
  } else if (
    (+yourMonth === 4 ||
      +yourMonth === 6 ||
      +yourMonth === 9 ||
      +yourMonth === 11) &&
    +yourDay > 30
  ) {
    errMsg[0].innerHTML = "Must be a valid date";
    renderError();
    dayOk = false;
  } else {
    if (emptyOk && yearOk && monthOk) {
      errMsg[0].innerHTML = "";
      removeError();
      dayOk = true;
    }
  }
  ////////////////logic/////////////////////////

  ageMonth = 12 + month - yourMonth;

  if (ageMonth === 12) {
    ageMonth = 0;
  } else {
    ageMonth = ageMonth;
  }
  if (yourDay <= day) {
    ageMonth += 1;
  }
  //////////////// error msg ///////////////////
  if (yourMonth > 12) {
    errMsg[1].innerHTML = "Must be a valid month";
    renderError();
    monthOk = false;
  } else if (yourMonth === "") {
    errMsg[1].innerHTML = "This field is required";
    renderError();
  } else {
    if (emptyOk) {
      errMsg[1].innerHTML = "";
      removeError();
      monthOk = true;
    }
  }
  /////////////////////logic///////////////////////

  if (ageMonth === 0) {
    ageYears = year - yourYear;
  } else {
    ageYears = year - yourYear - 1;
  }
  if (yourMonth <= month && yourDay <= day) {
    ageYears = ageYears + 1;
  }
  if (ageMonth === 12) {
    ageMonth = 0;
    ageYears += 1;
  }
  //////////////// error msg ///////////////////

  if (
    +yourYear > +year ||
    (+yourYear === +year && +yourMonth - 1 > +month) ||
    (+yourYear === +year && +yourMonth - 1 === +month && +yourDay > +day)
  ) {
    errMsg[2].innerHTML = "Must be in past";
    renderError();
    yearOk = false;
  } else if (yourYear === "") {
    errMsg[2].innerHTML = "This field is required";
    renderError();
  } else {
    if (emptyOk && monthOk) {
      errMsg[2].innerHTML = "";
      removeError();
      yearOk = true;
    }
  }
  ////////////////////////////////////////////

  //   if ((yourDay !== "") & (yourMonth !== "") & (yourYear !== "")) {
  if (emptyOk && monthOk && yearOk && dayOk) {
    const yearResult = document.querySelector(".result-year");
    yearResult.innerHTML = ageYears;
    const monthResult = document.querySelector(".result-month");
    monthResult.innerHTML = ageMonth;
    const daysResult = document.querySelector(".result-days");
    daysResult.innerHTML = ageDay;
  } else if (!emptyOk || !monthOk || !yearOk || !dayOk) {
    const yearResult = document.querySelector(".result-year");
    yearResult.innerHTML = "- -";
    const monthResult = document.querySelector(".result-month");
    monthResult.innerHTML = "- -";
    const daysResult = document.querySelector(".result-days");
    daysResult.innerHTML = "- -";
  }
};

const btn = document.querySelector(".submit");
btn.addEventListener("click", ageCalculator);

/////////////////////////////////////////
const renderError = function () {
  const input = document.querySelectorAll("input");
  const label = document.querySelectorAll("label");

  label.forEach((l) => {
    l.style.color = "hsl(0, 100%, 67%)";
  });
  input.forEach((i) => {
    i.style.outline = `none`;
    i.style.borderColor = "hsl(0, 100%, 67%)";
  });
};
const removeError = function () {
  const input = document.querySelectorAll("input");
  const label = document.querySelectorAll("label");
  label.forEach((l) => {
    l.style.color = "hsl(0, 1%, 44%)";
  });
  input.forEach((i) => {
    i.style.outline = `none`;
    i.style.borderColor = "hsl(0, 0%, 86%)";
  });
};
