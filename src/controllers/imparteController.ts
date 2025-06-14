import { Imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { AnyARecord } from 'dns';


export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err) => {
            if (err) { callback(err); return; }
            
            callback(null, {
                statusCode: 201,
                message: 'Relación de impartición creada exitosamente',
                data: { id_p: imparte.id_p, cod_a: imparte.cod_a, grupo: imparte.grupo }
            });
        }
    );
};
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';
    db.query(queryString, (err, results: any) => {
        if (err) {
            callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                message: 'Imparte encontrados exitosamente',
                data: results[0]
            });
        }
    });
};
export const getOne = (imparte: Imparte, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo],
        (err, results: any) => {
            if (err) { 
                callback(err); 
                return; 
            }
            
            if (results.length === 0) {
                callback(new Error('Registro no encontrado'));
                return;
            }
            
            callback(null, {
                statusCode: 200,
                data: results[0]
            });
        }
    );
};
export const update = (imparte: Imparte, callback: Function) => {
    const queryString = 'UPDATE imparte SET grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    
    db.query(
        queryString,
        [imparte.horario, imparte.id_p, imparte.cod_a, imparte.grupo],
        (err, result: any) => {
            if (err) { 
                callback(err); 
                return; 
            }
            
            if (result.affectedRows === 0) {
                callback(new Error('Registro no encontrado'));
                return;
            }
            
            callback(null, {
                statusCode: 200,
                message: 'Horario actualizado exitosamente',
                data: imparte
            });
        }
    );
};
export const remove = (imparte: Imparte, callback: Function) => {
    const queryString = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';
    
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo],
        (err, result: any) => {
            if (err) { 
                callback(err); 
                return; 
            }
            
            if (result.affectedRows === 0) {
                callback(new Error('Registro no encontrado'));
                return;
            }
            
            callback(null, {
                statusCode: 200,
                message: 'Relación eliminada exitosamente'
            });
        }
    );
};