export const fetchErrors = ({ errors, name }) => {
  let message = "";
  !!errors &&
    errors.forEach((error) => {
      if (error.field === name) {
        message = error.message;
      }
    });

  return <span className="field-errors">{message}</span>;
};
