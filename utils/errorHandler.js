const validateFields = (fields, requiredFields) => {
  const errors = [];
  // console.log(requiredFields);

  requiredFields.forEach((field) => {
    if (!fields[field] || fields[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return errors;
};

//! Error Response
const sendErrorResponse = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
  });
};

module.exports = {
  validateFields,
  sendErrorResponse,
};
