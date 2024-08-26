import { DateTime } from 'luxon';
import { Schema, model, Document } from 'mongoose';

interface Medicine {
  name: string;
  description: string;
  dosage: string;
};

export interface AppointmentInterface extends Document {
  name: string;
  cpf: string;
  dataAppointment: Date;
  chiefComplaints: string;
  allergies: string;
  historyPresent: string;
  familyHistory: string;
  medicines: Medicine[];
};

const AppointmentSchema = new Schema<AppointmentInterface>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  dataAppointment: { type: Date, required: true },
  chiefComplaints: { type: String, required: true },
  allergies: { type: String, required: true },
  historyPresent: { type: String, required: true },
  familyHistory: { type: String, required: true },
  medicines: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      dosage: { type: String, required: true },
    },
  ],
});

AppointmentSchema.pre('save', function(next) {
  if (this.dataAppointment) {
    this.dataAppointment = DateTime.fromJSDate(this.dataAppointment as unknown as Date).toJSDate();
  }
  next();
});


export const Appointments = model<AppointmentInterface>('Appointments', AppointmentSchema);
