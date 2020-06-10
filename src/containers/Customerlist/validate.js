const validate = values => {
  const errors = {};

  if (!values.clubName) {
    errors.clubName = "Required";
  }
  return errors;
};

export default validate;
