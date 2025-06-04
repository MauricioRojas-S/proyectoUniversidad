import { Estudiante } from '../models/estudianteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { AnyARecord } from 'dns';
 
export const create = (estudiante: Estudiante, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fecha_nac) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fecha_nac],
        (err) => {
            if (err) { callback(err); }
            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
};

export const getAll = (callback: Function) => {
    const queryString = "SELECT * FROM estudiantes";
    db.query(queryString, (err, results: any) => {
        if (err) {
            callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                message: 'Estudiantes encontrados exitosamente',
                data: results[0]
            });
        }
    });
};

export const getOne = (cod_e: string, callback: Function) => {
  const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';

  db.query(queryString, [cod_e], (err, results: any) => {
    if (err) {
      callback(err);
    } else if (results.length === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Estudiante no encontrado',
        data: null
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Estudiante encontrado',
        data: results[0]
      });
    }
  });
};

export const update = (cod_e: string, estudiante: Estudiante, callback: Function) => {
  const queryString = `UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fecha_nac = ? WHERE cod_e = ?`;

  db.query(
    queryString,
    [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fecha_nac, cod_e],
    (err, result: any) => {
      if (err) {
        callback(err);
      } else if (result.affectedRows === 0) {
        callback(null, {
          statusCode: 404,
          message: 'Estudiante no encontrado',
          data: null,
        });
      } else {
        callback(null, {
          statusCode: 200,
          message: 'Estudiante actualizado exitosamente',
          data: {
            cod_e: cod_e,
          },
        });
      }
    }
  );
};

export const remove = (cod_e: string, callback: Function) => {
  const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';

  db.query(queryString, [cod_e], (err, result: any) => {
    if (err) {
      callback(err);
    } else if (result.affectedRows === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Estudiante no encontrado',
        data: null,
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Estudiante eliminado exitosamente',
        data: {
          cod_e: cod_e,
        },
      });
    }
  });
};
