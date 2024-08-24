import { Request, Response } from "express";
import {
  listAppointments,
  createAppointment,
} from "../controllers/AppointmentsController";
import { Appointments } from "./../models/Appointments";

jest.mock("./../models/Appointments");

describe("Appointment Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    res = {
      json,
      status,
    };
  });

  it("should return a list of appointments", async () => {
    const mockAppointments = [
      {
        name: "Carla Lima",
        dataAppointment: "2024-08-20T11:00:00.000Z",
        chiefComplaints: "Dor de cabeça constante",
        allergies: "Aspirina",
        historyPresent:
          "Paciente com dor de cabeça constante há 3 dias, sem melhora com analgésicos.",
        familyHistory: "Mãe com enxaqueca crônica.",
        medicines: [
          {
            name: "Dipirona",
            description: "Analgésico",
            dosage: "1g a cada 8 horas",
            _id: "66c8eb82de502fe34e004be1",
          },
        ],
        __v: 0,
      },
      {
        name: "Ana Costa",
        dataAppointment: "2024-08-10T11:00:00.000Z",
        chiefComplaints: "Dor de cabeça constante",
        allergies: "Aspirina",
        historyPresent:
          "Paciente com dor de cabeça constante há 3 dias, sem melhora com analgésicos.",
        familyHistory: "Mãe com enxaqueca crônica.",
        medicines: [
          {
            name: "Dipirona",
            description: "Analgésico",
            dosage: "1g a cada 8 horas",
            _id: "66c8eb82de502fe34e004be1",
          },
        ],
        __v: 0,
      },
    ];
    (Appointments.find as jest.Mock).mockResolvedValue(mockAppointments);

    await listAppointments(req as Request, res as Response);

    expect(Appointments.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockAppointments);
  });

  it("should return a 500 error if there is an issue", async () => {
    const errorMessage = "Database Error";
    (Appointments.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await listAppointments(req as Request, res as Response);

    expect(Appointments.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  beforeEach(() => {
    req = {
      body: { name: "New Appointment" },
    };
  });

  it("should create a new appointment and return it", async () => {
    const mockAppointment = { id: "1", name: "New Appointment" };
    (Appointments.prototype.save as jest.Mock).mockResolvedValue(
      mockAppointment
    );

    await createAppointment(req as Request, res as Response);

    expect(Appointments).toHaveBeenCalledWith(req.body);
    expect(Appointments.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
