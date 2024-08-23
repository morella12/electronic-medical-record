import { createAppointment, listAppointments } from './../controllers/AppointmentsController';
import { describe, it, expect } from "vitest";
import { Request, Response } from "express";

describe("Appointment Controller", () => {
  it("must list appointment", () => {
    const req = {} as Request;
    const res = {
      json: (output: any) => output,
    } as unknown as Response;

    const output = listAppointments(req, res);
    expect(output).toEqual([]);
  });

  it("must add new appointment", () => {
    const req = {
      body: {
        name: "John Doe",
        dataAppointment: "2024-08-22T17:00:00Z",
        chiefComplaints: "Dor de cabeça",
        historyPresent: "Dor há 3 dias",
        allergies: "Nenhuma",
        familyHistory: "Hipertensão",
        medicines: {
          name: "Ibuprofeno",
          description: "Anti-inflamatórios",
          dosage: "300mg",
        },
      },
    } as Request;

    const res = {
      status: () => res,
      json: (output: any) => output,
    } as unknown as Response;

    const output = createAppointment(req, res);
    expect(output).toHaveProperty("id");
    expect(output.paciente).toBe("John Doe");
  });
});
