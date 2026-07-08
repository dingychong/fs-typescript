import express from "express";
import { calculateBMI } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
     
    const result = calculateBMI(height, weight);
    return res.json(result);
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    
    const dailyHours = daily_exercises.map((hour) => Number(hour));

    if (dailyHours.some(isNaN)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const result = calculateExercises(dailyHours, Number(target));
    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});