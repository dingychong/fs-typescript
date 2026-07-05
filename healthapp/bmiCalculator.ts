function calculateBMI(height: number, weight:number): string {
    const BMI = weight/((height/100)**2);
    if (BMI < 18.5) {
        return 'Underweight';
    } else if (BMI >= 18.5 && BMI < 24.9) {
        return 'Normal range';
    } else if (BMI >= 25 && BMI < 29.9) {
        return 'Overweight';
    } else if (BMI >= 30) {
        return 'Obese';
    }
    return 'Invalid BMI';
};

console.log(calculateBMI(180,74))