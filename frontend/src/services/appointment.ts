import apiClient from './api';

interface Medicine {
  name: string;
  description: string;
  dosage: string;
};

export interface IAppointment extends Document {
  name: string;
  dataAppointment: Date;
  chiefComplaints: string;
  allergies: string;
  historyPresent: string;
  familyHistory: string;
  medicines: Medicine[];
};

export const listAppointment = async (): Promise<IAppointment[]> => {
  const response = await apiClient.get<IAppointment[]>('/list');
  return response.data;
};

export const saveAtendimento = async (appointment: IAppointment): Promise<IAppointment> => {
  const response = await apiClient.post<IAppointment>('/createAppointment', appointment);
  return response.data;
};
