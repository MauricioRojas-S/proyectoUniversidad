import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';

const imparteRouter = express.Router();

// Crear nueva relación
imparteRouter.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});

// Actualizar horario
imparteRouter.patch('/', async (req: Request, res: Response) => {
    const updates: Imparte = req.body;
    imparteController.update(updates, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});

// Obtener relación
imparteRouter.get('/', async (req: Request, res: Response) => {
    const searchParams: Imparte = req.query as any;
    imparteController.getOne(searchParams, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(result);
    });
});

// Eliminar relación
imparteRouter.delete('/', async (req: Request, res: Response) => {
    const toDelete: Imparte = req.body;
    imparteController.remove(toDelete, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});


export {imparteRouter};