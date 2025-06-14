import { Profesor } from '../models/profesorModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { AnyARecord } from 'dns';
 
export const create = (profesor: Profesor, callback: Function) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion],
        (err) => {
            if (err) { callback(err); }
            callback(null, {
                statusCode: 201,
                message: 'Profesor creado exitosamente',
                data: {
                    id_p: profesor.id_p
                }
            });
        }
    );
};

export const getAll = (callback: Function) => {
    const queryString = "SELECT * FROM profesores";
    db.query(queryString, (err, results: any) => {
        if (err) {
            callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                message: 'Profesores encontrados exitosamente',
                data: results[0]
            });
        }
    });
};

export const getOne = (id_p: string, callback: Function) => {
  const queryString = 'SELECT * FROM profesores WHERE id_p = ?';

  db.query(queryString, [id_p], (err, results: any) => {
    if (err) {
      callback(err);
    } else if (results.length === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Profesor no encontrado',
        data: null
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Profesor encontrado',
        data: results[0]
      });
    }
  });
};

export const update = (id_p: string, profesor: Profesor, callback: Function) => {
  const queryString = `UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?`;

  db.query(
    queryString
    [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, profesor.id_p],
    (err, result: any) => {
      if (err) {
        callback(err);
      } else if (result.affectedRows === 0) {
        callback(null, {
          statusCode: 404,
          message: 'Profesor no encontrado',
          data: null,
        });
      } else {
        callback(null, {
          statusCode: 200,
          message: 'Profesor actualizado exitosamente',
          data: {
            id_p: id_p,
          },
        });
      }
    }
  );
};

export const remove = (id_p: string, callback: Function) => {
  const queryString = 'DELETE FROM profesores WHERE id_p = ?';

  db.query(queryString, [id_p], (err, result: any) => {
    if (err) {
      callback(err);
    } else if (result.affectedRows === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Profesor no encontrado',
        data: null,
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Profesor eliminado exitosamente',
        data: {
          id_p: id_p,
        },
      });
    }
  });
};
