// Email validation regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - at least 6 characters, one uppercase, one number
const isValidPassword = (password) => {
  // Regex: minimum 6 characters, at least one uppercase, at least one digit
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

// Alternative: Simple password validation (minimum 6 characters, at least one letter and one number)
const isValidPasswordSimple = (password) => {
  return (
    password &&
    password.length >= 6 &&
    /\d/.test(password) &&
    /[a-zA-Z]/.test(password)
  );
};

// Name validation - at least 2 characters, no numbers
const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};

// Validate signup data
const validateSignup = (data) => {
  const errors = {};

  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (!isValidName(data.firstName.trim())) {
    errors.firstName =
      "First name must be at least 2 characters and contain only letters";
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (!isValidName(data.lastName.trim())) {
    errors.lastName =
      "Last name must be at least 2 characters and contain only letters";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!isValidPassword(data.password)) {
    errors.password =
      "Password must be at least 6 characters with 1 uppercase letter and 1 number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate login data
const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidName,
  validateSignup,
  validateLogin,
};
