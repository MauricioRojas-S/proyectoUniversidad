import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesor } from '../models/profesorModel';

const profesorRouter = express.Router();
 
profesorRouter.post('/', async (req: Request, res: Response) => {
    const newProfesor: Profesor = req.body;
    profesorController.create(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

profesorRouter.get('/:id_p', async (req: Request, res: Response) => {
  const id_p = req.params.id_p;

  profesorController.getOne(id_p, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});

profesorRouter.get('/', async (req: Request, res: Response) => {
    profesorController.getAll((err: Error, result: any) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(result.statusCode).json(result);
        }
    });
});

profesorRouter.put('/:id_p', async (req: Request, res: Response) => {
  const id_p = req.params.id_p;
  const updatedProfesor: Profesor = req.body;

  profesorController.update(id_p, updatedProfesor, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});

profesorRouter.delete('/:id_p', async (req: Request, res: Response) => {
  const id_p = req.params.id_p;

  profesorController.remove(id_p, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});


export {profesorRouter};