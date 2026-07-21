import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other"
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const newPatientEntrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  gender: z.enum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.iso.date().optional(),
});

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;