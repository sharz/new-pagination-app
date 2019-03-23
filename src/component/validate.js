export default function(values) {
  const errors = {};
  const requiredFields = [
    "paymentId",
    "orderDate",
    "paymentStatus",
    "merchantId",
    "customerEmail",
    "amount"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.userName && values.userName.length <= 3
  ) {
    errors.userName = "Must be greater than 3 characters";
  }
  if (
    values.userName && values.userName.length >= 15
  ) {
    errors.userName = "Must be 15 characters or less";
  }
  if (
    values.customerEmail &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.customerEmail)
  ) {
    errors.customerEmail = "Invalid customerEmail address";
  }
  if (
    values.contact &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact)
  ) {
    errors.customerEmail = "Invalid contact Number";
  }
  if (values.password !== values.retypePassword
  ) {
    errors.retypePassword = "password doesnt match";
  }
  return errors;
}
