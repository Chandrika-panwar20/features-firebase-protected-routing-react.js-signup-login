import { appConstants } from "../utils";

export const validateName = (inputValues) => {
  // let errors = {name: ""
  let errors={}
  if (/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(inputValues)) {
    errors.name = appConstants.errorMassages.NO_ERROR
  } else {
    errors.name = appConstants.errorMassages.INVALID_NAME
    // num=false
  }
  if (inputValues.length < 3 || inputValues.length > 20) {
    errors.name = appConstants.errorMassages.NAME_LENGTH
    // num=false
  }
  return errors;
};

export const validateEmail = (inputValues) => {
  let errors = {};
  if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){3,}\.([a-zA-Z]{2,5})$/.test(inputValues)) {
    errors.email = appConstants.errorMassages.NO_ERROR
  } else {
    errors.email = appConstants.errorMassages.INVALID_EMAIL
  }
  return errors;
};

export const validatePhone = (inputValues) => {
  let errors = {};
  if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputValues) &&
    inputValues?.length === 10) {
    errors.phone = appConstants.errorMassages.NO_ERROR
  } else {
    errors.phone = appConstants.errorMassages.INVALID_PHONE_NUMBER
  }
  return errors;
};

export const validatePassword = (inputValues, cpass) => {
  let errors = {};
  // console.log("cpass", cpass)
  // if (cpass !== '' && inputValues !== cpass) {
  //   errors.password = appConstants.errorMassages.PASSWORD_CONFIRMPASSWORD_MATCH
  // } 
  if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(inputValues)) {
    errors.password = appConstants.errorMassages.NO_ERROR
  } else {
    errors.password = appConstants.errorMassages.INVALID_PASSWORD;
  }
  
  return errors;
}

export const validateConfirmPassword = (inputValues, passValue) => {
  let errors = {}
  if (inputValues === passValue) {
    errors.confirmPassword = appConstants.errorMassages.NO_ERROR
    // console.log("validation no error")
  } else {
    errors.confirmPassword = appConstants.errorMassages.CONFIRM_PASSWORD
    // console.log("validation having  error")

  }
  return errors;
}
 