import { Appointment } from '../models/Appointments';
import { Request, Response } from 'express';

let appointments: Appointment[] = [];

export const lsitAppointments = (req: Request, res: Response): void => {
  res.json(appointments);
};

export const createAppointments = (req: Request, res: Response): void => {
  const newApointment: Appointment = {
    id: appointments.length + 1,
    ...req.body
  };
  appointments.push(newApointment);
  res.status(201).json(newApointment);
};
