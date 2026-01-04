import { pool } from "../database";
import { AlumnoCurso } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllAlumnoCurso = async (): Promise<AlumnoCurso[]> => {
  const query = `
    SELECT *
    FROM alumno_curso
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getAlumnoCursoById = async (
  id: number
): Promise<AlumnoCurso | null> => {
  const query = `
    SELECT *
    FROM alumno_curso
    WHERE id = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createAlumnoCurso = async (
  data: Partial<AlumnoCurso>
): Promise<AlumnoCurso> => {
  const query = `
    INSERT INTO alumno_curso (id_alumno, id_curso, usuario_creacion)
    VALUES ($1, $2, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [data.id_alumno, data.id_curso]);
  return mapAuditoria(res.rows[0]);
};

export const deleteAlumnoCurso = async (
  id: number
): Promise<AlumnoCurso | null> => {
  const query = `
    UPDATE alumno_curso
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
