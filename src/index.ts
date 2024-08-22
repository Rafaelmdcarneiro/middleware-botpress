import cors from 'cors';
import express from 'express';
import { AppRouter } from './routes/app';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/', AppRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(
		`[BOT-MIDDLEWARE]: RUNNING ON PORT ${process.env.PORT || 8080}`
	);
});
