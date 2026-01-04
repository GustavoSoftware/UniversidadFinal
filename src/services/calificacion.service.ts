import { pool } from "../database";
import { Calificacion } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllCalificaciones = async (): Promise<Calificacion[]> => {
  const query = `
    SELECT *
    FROM calificaciones
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getCalificacionById = async (
  id: number
): Promise<Calificacion | null> => {
  const query = `
    SELECT *
    FROM calificaciones
    WHERE id_nota = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createCalificacion = async (
  data: Partial<Calificacion>
): Promise<Calificacion> => {
  const query = `
    INSERT INTO calificaciones
      (id_alumno, id_curso, tipo_examen, puntaje, usuario_creacion)
    VALUES ($1, $2, $3, $4, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.id_alumno,
    data.id_curso,
    data.tipo_examen,
    data.puntaje,
  ]);
  return mapAuditoria(res.rows[0]);
};

export const updateCalificacion = async (
  id: number,
  data: Partial<Calificacion>
): Promise<Calificacion | null> => {
  const query = `
    UPDATE calificaciones
    SET tipo_examen = $1,
        puntaje = $2,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_nota = $3
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.tipo_examen,
    data.puntaje,
    id,
  ]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deleteCalificacion = async (
  id: number
): Promise<Calificacion | null> => {
  const query = `
    UPDATE calificaciones
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_nota = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const updateCalificacionPartial = async (
  id: number,
  data: Partial<Calificacion>
): Promise<Calificacion | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.tipo_examen !== undefined) {
    fields.push(`tipo_examen = $${index++}`);
    values.push(data.tipo_examen);
  }

  if (data.puntaje !== undefined) {
    fields.push(`puntaje = $${index++}`);
    values.push(data.puntaje);
  }

  if (fields.length === 0) return null;

  const query = `
    UPDATE calificaciones
    SET ${fields.join(", ")},
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_nota = $${index}
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;

  values.push(id);
  const res = await pool.query(query, values);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
