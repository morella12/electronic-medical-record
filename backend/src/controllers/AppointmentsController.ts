import { Appointment } from './../models/Appointments';
import { Request, Response } from 'express';

export const listAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await Appointment.find();
    console.log(Appointment);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
