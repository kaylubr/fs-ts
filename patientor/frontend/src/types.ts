import { z } from "zod";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export const BaseNewEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional()
});

export const HealthCheckEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ])
});

export const OccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

export const HospitalEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema
]);

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema.extend({ id: z.string() }),
  OccupationalHealthcareEntrySchema.extend({ id: z.string() }),
  HospitalEntrySchema.extend({ id: z.string() })
]);

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;