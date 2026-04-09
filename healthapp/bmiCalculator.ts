import { isNotNumber } from "./utils/helper.ts";

type BmiResult = 'Underweight' | 'Normal Range' | 'Overweight' | 'Obese';

export const calculateBmi = (heightInCm: number, weightInKg: number): BmiResult => {
  const bmi: number = weightInKg / Math.pow(heightInCm / 100, 2);

  if (bmi < 18.5)
    return 'Underweight';
  else if (bmi < 25.0)
    return 'Normal Range';
  else if (bmi < 30.0)
    return 'Overweight';
  else
    return 'Obese';
};

const parseArguments = (args: string[]): BmiResult => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Not enough arguments (min. 4)');
  
  if (!isNotNumber(args[2]) && !isNotNumber(args[3]))
    return calculateBmi(Number(args[2]), Number(args[3]));
  else
    throw new Error('Invalid arguments');
};

if (process.argv[1] === import.meta.filename)  {
  try {
    const bmi = parseArguments(process.argv);
    console.log(bmi);
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error)
      errorMessage += error.message;
    console.error(errorMessage);
  }
}