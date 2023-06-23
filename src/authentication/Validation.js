import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const Schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRules, { message: "Invalid email" })
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

let currentUser;
let currentPassword;
if (
  sessionStorage.getItem("user") === "" ||
  sessionStorage.getItem("user") === null
) {
  currentUser = "";
  currentPassword = "";
} else {
  currentUser = JSON.parse(sessionStorage.getItem("user"));
  currentPassword = currentUser.password;
}

export const editSchema = yup.object().shape({
  passwordEdit: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPasswordEdit: yup
    .string()
    .oneOf([yup.ref("passwordEdit"), null], "Passwords must match")
    .required("Required"),
  currentPassword: yup
    .string()
    // .matches(currentPassword, null, { message: "Incorrect password" })
    .oneOf([currentPassword, null], "Incorrect password")
    .required("Required"),
});
