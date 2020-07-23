const config = require("../util/config");


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
exports.validateSignUpData = (data) => {
  //This section checks for errors in the sign up and if they have it it will add and error to the object which will it turn be check and if any errors come up it will be shown
  let errors = {};

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
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

//checks login
exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};

//TODO:
//handle images - profile images, company images, bestwork images
exports.reduceProfileDetails = (data) => {
  let profileDetails = {};
  let expArr = [];
  let expCheck;
  let workArr = [];
  let bestWorkEntry;
  //default images
  const noImgComp = "no-imgcomp.jpg"
  const noImg = "no-img.png";
  //
  if (!isEmpty(data.profileImageUrl)) {
    profileDetails.profileImageUrl = data.profileImageUrl
  } else {
    profileDetails.profileImageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`
  }
  
  if (!isEmpty(data.fullName.trim())) profileDetails.fullName = data.fullName;
  if (!isEmpty(data.location.trim())) profileDetails.locaiton = data.location;
  if (!isEmpty(data.recentEmp.trim()))
    profileDetails.recentEmp = data.recentEmp;
  if (!isEmpty(data.trade.trim())) profileDetails.trade = data.trade;
  if (!isEmpty(data.about.trim())) profileDetails.about = data.about;

  //experience
  if (data.exp) {
    data.exp.forEach((doc) => {
      if ( !isEmpty(doc["company"]) && !isEmpty(doc["date"]) && !isEmpty(doc["text"])) {
        expArr.push(doc);
      } else {
        expCheck = Object.entries(doc);
        expCheck.forEach((entry) => {
          if (entry[1] === "") {
            if (entry[0] === "imageUrl" && entry[1] === ''){
              entry[1] = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImgComp}?alt=media`
           }
           else{
             entry[1] = "Please Enter Text";
            entry[1] = "Please Enter Text";
          } 
        }
        });
        let newExpEntry = expCheck.reduce((result, [key, value]) => {
          result[key] = value;
          return result;
        }, {});
        expArr.push(newExpEntry);
      }
    });
    profileDetails.exp = expArr;
  }
  //skills
  if (data.licences) {
    if (!isEmpty(data.licences[0])) {
      profileDetails.licences = data.licences;
    } else {
      profileDetails.licences = data.licences;
    }
  }
  if (data.education) {
    if (!isEmpty(data.education[0])) {
      profileDetails.education = data.education;
    } else {
      profileDetails.education = data.education;
    }
  }
  if (data.refrences) {
    if (!isEmpty(data.refrences[0])) {
      profileDetails.refrences = data.refrences;
    } else {
      profileDetails.refrences = data.refrences;
    }
  }

  if (data.bestWork) {
    data.bestWork.forEach((doc) => {
      bestWorkEntry = Object.entries(doc);
      bestWorkEntry.forEach((entry) => {
        if (entry[1] === "") {
          if (entry[0] === "imageUrl" && entry[1] === ''){
             entry[1] = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImgComp}?alt=media`
          }
          else{
            entry[1] = "Please Enter Text";
        } 
      }
      });
      let newBestWorkEntry = bestWorkEntry.reduce((result, [key, value]) => {
        result[key] = value;
        return result;
      }, {});
      workArr.push(newBestWorkEntry);
    });
    profileDetails.bestWork = workArr;
  }
  return profileDetails;
};
