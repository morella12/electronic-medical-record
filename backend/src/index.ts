import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import appointmentRoutes  from './routes/appointmentsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL!)
.then(() => console.log('Database connection success'))
.catch(() => console.error('Failed to connect to database'));

app.use(express.json());
app.use('/api', appointmentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
