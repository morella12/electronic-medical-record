export interface IMedicine {
  name: string;
  description: string;
  dosage: string;
  id?: string;
};

export interface IAppointment {
  name: string;
  cpf: string,
  dataAppointment: Date;
  chiefComplaints: string;
  allergies: string;
  historyPresent: string;
  familyHistory: string;
  medicines: IMedicine[];
};