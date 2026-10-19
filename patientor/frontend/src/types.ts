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
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];

}
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewEntry = 
  | NewHealthCheckEntry 
  | NewOccupationalHealthcareEntry 
  | NewHospitalEntry;
  
const entrySchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  date: z.iso.date(),
  specialist: z.string().min(1, { message: "Specialist is required" }),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckEntrySchema = entrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
])
});

const occupationalHealthcareEntrySchema = entrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, { message: "Employer name is required" }),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date()
  }).optional()
});

const hospitalEntrySchema = entrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string().min(1, { message: "Discharge criteria is required" })
  })
});

export const newEntrySchema = z.discriminatedUnion('type',[
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema
])

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
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;