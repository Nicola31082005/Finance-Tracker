export const getErrorMessage = (err) => {
  switch (err.name) {
    case "SequelizeDatabaseError":
      return "Validation Error";
    default:
      return err.message;
  }
};
