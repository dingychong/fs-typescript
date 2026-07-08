interface returnValue { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseValues {
    dailyHours: number[];
    target: number;
}

const parseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments, please provide daily hours and target');

    const dailyHours = args.slice(2, -1).map((hour) => {
            if (isNaN(Number(hour))) {
                throw new Error('Provided values were not numbers!');
            }
            return Number(hour);
        });
    const target = Number(args[args.length - 1]);
    if (isNaN(target)) {
        throw new Error('Provided target was not a number!');
    }
    return { dailyHours, target };
};
    
export const calculateExercises = (dailyHours: number[], target: number): returnValue => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((value)=> value != 0).length;
    const average = dailyHours.reduce((a, b)=> a + b)/periodLength;
    const success = average >= target;
    const percentageGoal = average/target;
    let rating = 1;
    let ratingDescription = 'You need to work harder';
    if (percentageGoal < 0.5) {
        rating = 1;
        ratingDescription = 'You need to work harder';
    } else if (percentageGoal >= 0.5 && percentageGoal < 1) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else if (percentageGoal >= 1) {
        rating = 3;
        ratingDescription = 'Great job, you met your goal!';
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

try {
    const { dailyHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
}