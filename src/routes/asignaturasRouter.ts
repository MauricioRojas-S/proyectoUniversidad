import express, { Request, Response } from 'express';
import * as asignaturasController from '../controllers/asignaturasController';
import { Asignaturas } from '../models/asignaturasModel';

const asignaturasRouter = express.Router();
 
asignaturasRouter.post('/', async (req: Request, res: Response) => {
    const newAsignaturas: Asignaturas = req.body;
    asignaturasController.create(newAsignaturas, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
asignaturasRouter.get('/:cod_a', async (req: Request, res: Response) => {
  const id_p = req.params.id_p;

  asignaturasController.getOne(id_p, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});

asignaturasRouter.get('/', async (req: Request, res: Response) => {
    asignaturasController.getAll((err: Error, result: any) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(result.statusCode).json(result);
        }
    });
});

asignaturasRouter.put('/:cod_a', async (req: Request, res: Response) => {
  const cod_a = req.params.cod_a;
  const updatedAsignaturas: Asignaturas = req.body;

  asignaturasController.update(cod_a, updatedAsignaturas, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});

asignaturasRouter.delete('/:cod_a', async (req: Request, res: Response) => {
  const cod_a = req.params.cod_a;

  asignaturasController.remove(cod_a, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});


export {asignaturasRouter};