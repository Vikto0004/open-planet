export const checkFormIsValid = <T extends (string | (string | undefined)[])[]>(
  formValues: T,
) => {
  return formValues.every((value) => {
    if (Array.isArray(value)) {
      return value.length >= 5;
    }
    return value !== null && value !== undefined && value !== "";
  });
};
