import { isNotNumber, allNumber } from "./utils/helper.ts";

interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const exerciseCalculator = (exerciseHours: number[], target: number): ExerciseData => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(e => e > 0).length;
  const average = exerciseHours
  // eslint-disable-next-line
    .reduce((total, cur) => total += cur, 0) / exerciseHours.length;
  const success = average >= target;
  
  let rating: number;
  if (average < target / 2)
    rating = 1;
  else if (average < target)
    rating = 2;
  else
    rating = 3; 

  let ratingDescription: string = "";
  switch (rating) {
    case 1:
      ratingDescription = 'Need lots of improvement.';
      break;
    case 2:
      ratingDescription = 'Not too bad but could be better.';
      break;
    case 3:
      ratingDescription = 'Impressive!';
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments (min. 4)');

  if (allNumber(args.slice(3)) && !isNotNumber(args[2]))
    return exerciseCalculator(args.slice(3).map(n => Number(n)), Number(args[2]));
  else
    throw new Error('Invalid arguments');
};

if (process.argv[1] === import.meta.filename) {
  try {
    const result = parseArguments(process.argv);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) 
      errorMessage += error.message;
    console.error(errorMessage);
  }
}