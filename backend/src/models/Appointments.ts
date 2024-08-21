import { DateTime } from 'luxon'

export interface Appointment {
  id: number;
  name: string;
  dataAppointment: DateTime;
  chiefComplaints: string;
  allergies: string;
  historyPresent: string;
  familyHistory: string;
  medicines: Medicine;
};

interface Medicine {
  name: string;
  description: string;
  dosage: string;
};