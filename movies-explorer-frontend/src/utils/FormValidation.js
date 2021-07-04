function createValidationRule(ruleName, errorMessage, validateFunc) {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
}

/* export const nameRegex = RegExp("([a-zA-Z]+|[а-яёА-Я]+)(?:\s|\-)([a-zA-Z]+|[а-яёА-Я]+)([a-zA-Z]+|[а-яёА-Я]+)")
 */
/* export const nameRegex = RegExp("^([a-zA-Z\s|-]+)|([а-яёА-Я\s|-]+){2,30}$") */
export const nameRegex = RegExp("^[a-zёа-яA-ZЁА-Я( )-]+$")
export const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

export function requiredRule(inputName) {
  return createValidationRule(
    'required',
    `${inputName} Необходим`,
    (inputValue) => inputValue.length !== 0
  );
}

export function nameRule(inputName) {
  return createValidationRule(
    'name',
    `${inputName} может содержать только латиницу, кириллицу, пробел или дефис`,
    (inputValue) => nameRegex.test(inputValue)
  );
}

export function emailRule(inputName) {
  return createValidationRule(
    'email',
    `${inputName} должно соответствовать электронной почте`,
    (inputValue) => emailRegex.test(inputValue)
  );
}