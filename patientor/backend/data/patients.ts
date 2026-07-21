import { Gender } from "../src/types.ts";
import type { Patient } from "../src/types.ts";

export const patients: Patient[] = [
  {
    id: "d2773330-3a6b-4c7e-8f1e-2f5b9c1e5f1a",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    gender: Gender.Male,
    occupation: "Software Engineer",
    ssn: "123-45-6789",
  },
  {
    id: "e3b0c442-98fc-1c14-9af8-4f5b9c1e5f1a",
    name: "Jane Smith",
    dateOfBirth: "1985-05-15",
    gender: Gender.Female,
    occupation: "Graphic Designer", 
    ssn: "987-65-4321",
  },
];