
//Helper methods
const isEmpty = (string) => {
    if (string.trim() === "") return true;
    else return false;
  };
  const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };


//checks signUpData
exports.validateSignUpData = (data) =>{
    //This section checks for errors in the sign up and if they have it it will add and error to the object which will it turn be check and if any errors come up it will be shown
    let errors = {};
    console.log("here")
    console.log(data)
    if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
    }
    if (isEmpty(data.password)) errors.password = "Must not be empty";
    if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
    if (isEmpty(data.password)) errors.password = "Must not be empty";
    if (isEmpty(data.handle)) errors.handle = "Must not be empty";

    // check if there is no keys in errors
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

//checks login
  exports.validateLoginData = (data) =>{
    console.log(data)
    let errors = {};
    if(isEmpty(data.email)) errors.email = "Must not be empty";
    if(isEmpty(data.password)) errors.password = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
  