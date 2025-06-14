import { Asignaturas } from '../models/asignaturasModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { AnyARecord } from 'dns';

export const create = (asignaturas: Asignaturas, callback: Function) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [asignaturas.cod_a, asignaturas.nom_a, asignaturas.int_h, asignaturas.creditos],
        (err) => {
            if (err) { callback(err); }
            callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: {
                    cod_a: asignaturas.cod_a
                }
            });
        }
    );
};

export const getAll = (callback: Function) => {
    const queryString = "SELECT * FROM asignaturas";
    db.query(queryString, (err, results: any) => {
        if (err) {
            callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                message: 'Asignaturas encontradas exitosamente',
                data: results[0]
            });
        }
    });
};

export const getOne = (cod_a: string, callback: Function) => {
  const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';

  db.query(queryString, [cod_a], (err, results: any) => {
    if (err) {
      callback(err);
    } else if (results.length === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Asignaturas no encontradas',
        data: null
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Asignaturas encontradas',
        data: results[0]
      });
    }
  });
};

export const update = (cod_a: string, asignaturas: Asignaturas, callback: Function) => {
  const queryString = `UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?`;

  db.query(
    queryString,
    [asignaturas.nom_a, asignaturas.int_h, asignaturas.creditos, cod_a],
    (err, result: any) => {
      if (err) {
        callback(err);
      } else if (result.affectedRows === 0) {
        callback(null, {
          statusCode: 404,
          message: 'Asignatura no encontrada',
          data: null,
        });
      } else {
        callback(null, {
          statusCode: 200,
          message: 'Asignatura actualizada exitosamente',
          data: {
            cod_a: cod_a,
          },
        });
      }
    }
  );
};


export const remove = (cod_a: string, callback: Function) => {
  const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';

  db.query(queryString, [cod_a], (err, result: any) => {
    if (err) {
      callback(err);
    } else if (result.affectedRows === 0) {
      callback(null, {
        statusCode: 404,
        message: 'Asignatura no encontrada',
        data: null,
      });
    } else {
      callback(null, {
        statusCode: 200,
        message: 'Asignatura eliminada exitosamente',
        data: {
          cod_a: cod_a,
        },
      });
    }
  });
};
