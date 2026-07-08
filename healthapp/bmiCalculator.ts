interface bmiValues {
    height: number;
    weight: number;
}

interface bmiResult {
    height: number;
    weight: number;
    bmi: string;
}
const parseBMIArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments, please provide height and weight');
    if (args.length > 4) throw new Error('Too many arguments, please provide only height and weight');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');
    }

    return { height, weight };
};


export const calculateBMI = (height: number, weight:number): bmiResult =>{
    const BMI = weight/((height/100)**2);
    if (BMI < 18.5) {
        console.log(`BMI is ${BMI.toFixed(2)} - Underweight`);
        return { height, weight, bmi: 'Underweight' };
    } else if (BMI >= 18.5 && BMI < 24.9) {
        console.log(`BMI is ${BMI.toFixed(2)} - Normal weight`);
        return { height, weight, bmi: "Normal Range" };
    } else if (BMI >= 25 && BMI < 29.9) {
        console.log(`BMI is ${BMI.toFixed(2)} - Overweight`);
        return { height, weight, bmi: "Overweight" };
    } else if (BMI >= 30) {
        console.log(`BMI is ${BMI.toFixed(2)} - Obesity`);
        return { height, weight, bmi: "Obesity" };
    }
    return { height, weight, bmi: "NaN" };
};

try {
    const { height, weight } = parseBMIArguments(process.argv);
    console.log(calculateBMI(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
}