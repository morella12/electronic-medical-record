import type { IAppointment } from '@/utils/interfaces';
import api from './api';

export const listAppointment = async (): Promise<IAppointment[]> => {
  const response = await api.get<IAppointment[]>('/list');
  return response.data;
};

export const saveAtendimento = async (appointment: IAppointment): Promise<IAppointment> => {
  const response = await api.post('/createAppointment', appointment);
  return response.data;
};
