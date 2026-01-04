import { pool } from "../database";
import { Curso } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllCursos = async (): Promise<Curso[]> => {
  const query = `
    SELECT *
    FROM cursos
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getCursoById = async (id: number): Promise<Curso | null> => {
  const query = `
    SELECT *
    FROM cursos
    WHERE id_curso = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createCurso = async (
  data: Partial<Curso>
): Promise<Curso> => {
  const query = `
    INSERT INTO cursos (nombre_curso, creditos, id_profesor, usuario_creacion)
    VALUES ($1, $2, $3, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombre_curso,
    data.creditos,
    data.id_profesor,
  ]);
  return mapAuditoria(res.rows[0]);
};

export const updateCurso = async (
  id: number,
  data: Partial<Curso>
): Promise<Curso | null> => {
  const query = `
    UPDATE cursos
    SET nombre_curso = $1,
        creditos = $2,
        id_profesor = $3,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_curso = $4
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombre_curso,
    data.creditos,
    data.id_profesor,
    id,
  ]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deleteCurso = async (id: number): Promise<Curso | null> => {
  const query = `
    UPDATE cursos
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_curso = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const updateCursoPartial = async (
  id: number,
  data: Partial<Curso>
): Promise<Curso | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.nombre_curso !== undefined) {
    fields.push(`nombre_curso = $${index++}`);
    values.push(data.nombre_curso);
  }

  if (data.creditos !== undefined) {
    fields.push(`creditos = $${index++}`);
    values.push(data.creditos);
  }

  if (data.id_profesor !== undefined) {
    fields.push(`id_profesor = $${index++}`);
    values.push(data.id_profesor);
  }

  if (fields.length === 0) return null;

  const query = `
    UPDATE cursos
    SET ${fields.join(", ")},
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_curso = $${index}
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;

  values.push(id);
  const res = await pool.query(query, values);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
