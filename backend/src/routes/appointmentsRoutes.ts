import { lsitAppointments, createAppointments } from './../controllers/AppointmentsController';
import { Router } from 'express';

const router = Router();

router.get('/list', lsitAppointments);
router.post('/createAppointment', createAppointments);

export default router;
