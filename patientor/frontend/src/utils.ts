const asserNever = (value: never): never => {
  throw new Error(`Unhandled discrimanating union type: ${JSON.stringify(value)}`);
};

export default { asserNever };