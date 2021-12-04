import validator from "validator";

export const passStrengthChecker = async (e) => {
  if (
    validator.isStrongPassword(e, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return "strong";
  } else {
    return "weak";
  }
};
