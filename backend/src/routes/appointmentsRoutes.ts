import { Router } from 'express';
import { listAppointments, createAppointment } from './../controllers/AppointmentsController';

const router = Router();

router.get('/list', listAppointments);
router.post('/createAppointment', createAppointment);

export default router;
