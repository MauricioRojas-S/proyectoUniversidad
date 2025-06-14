import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { estudianteRouter } from './src/routes/estudianteRouter';
import { profesorRouter } from './src/routes/profesorRouter';
import { asignaturasRouter } from './src/routes/asignaturasRouter';
import { imparteRouter } from './src/routes/imparteRouter';
import { db } from './db';
import cors from 'cors';

const app = express();
dotenv.config();
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

 
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

app.use('/estudiantes', estudianteRouter);
 
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});

app.use('/profesores', profesorRouter);
 
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});
 

app.use('/asignaturas', asignaturasRouter);
 
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});

app.use('/imparte', imparteRouter);
 
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});
 
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
}); 