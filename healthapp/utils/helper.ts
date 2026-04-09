// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allNumber = (argument: any): boolean => {
  if (Array.isArray(argument)) {
    return argument.every(arg => !isNotNumber(arg));
  }

  return false;
};