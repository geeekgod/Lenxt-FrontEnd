// let strongPassword = new RegExp(
//   "(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{8,})"
// );
let strongPassword = /(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{8,})/;
// let mediumPassword = new RegExp(
// "((?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{6,}))|((?=.[a-z])(?=.[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
// );

let mediumPassword =
  /((?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[^A-Za-z0-9])(?=.{6,}))|((?=.[a-z])(?=.[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

export const passStrengthChecker = (e) => {
  console.log("Strong", strongPassword.test(e));
  if (strongPassword.test(e)) {
    console.log("strong1");
    return "strong";
  } else if (mediumPassword.test(e)) {
    console.log("medium1");
    return "medium";
  } else {
    console.log("weak1");
    return "weak";
  }
};
