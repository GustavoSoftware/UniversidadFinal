import { pool } from "../database";
import { Alumno } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllAlumnos = async (): Promise<Alumno[]> => {
  const query = `
    SELECT *
    FROM alumnos
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getAlumnoById = async (id: number): Promise<Alumno | null> => {
  const query = `
    SELECT *
    FROM alumnos
    WHERE id_alumno = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createAlumno = async (
  data: Partial<Alumno>
): Promise<Alumno> => {
  const query = `
    INSERT INTO alumnos (nombres, apellidos, email, ciclo, id_carrera, usuario_creacion)
    VALUES ($1, $2, $3, $4, $5, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombres,
    data.apellidos,
    data.email,
    data.ciclo,
    data.id_carrera,
  ]);
  return mapAuditoria(res.rows[0]);
};

export const updateAlumno = async (
  id: number,
  data: Partial<Alumno>
): Promise<Alumno | null> => {
  const query = `
    UPDATE alumnos
    SET nombres = $1,
        apellidos = $2,
        email = $3,
        ciclo = $4,
        id_carrera = $5,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_alumno = $6
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombres,
    data.apellidos,
    data.email,
    data.ciclo,
    data.id_carrera,
    id,
  ]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deleteAlumno = async (id: number): Promise<Alumno | null> => {
  const query = `
    UPDATE alumnos
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_alumno = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
