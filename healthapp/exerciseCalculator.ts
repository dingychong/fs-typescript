interface returnValue { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
function calculateExercises(dailyHours: number[], target: number): returnValue {
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));