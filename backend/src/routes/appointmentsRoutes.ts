import { listAppointments, createAppointment } from './../controllers/AppointmentsController';
import { Router } from 'express';

const router = Router();

router.get('/list', listAppointments);
router.post('/createAppointment', createAppointment);

export default router;
