import { pool } from "../database";
import { Horario } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllHorarios = async (): Promise<Horario[]> => {
  const query = `
    SELECT *
    FROM horarios
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getHorarioById = async (id: number): Promise<Horario | null> => {
  const query = `
    SELECT *
    FROM horarios
    WHERE id_horario = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createHorario = async (
  data: Partial<Horario>
): Promise<Horario> => {
  const query = `
    INSERT INTO horarios (id_curso, pabellon, nro_aula, dia_semana, usuario_creacion)
    VALUES ($1, $2, $3, $4, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.id_curso,
    data.pabellon,
    data.nro_aula,
    data.dia_semana,
  ]);
  return mapAuditoria(res.rows[0]);
};

export const updateHorario = async (
  id: number,
  data: Partial<Horario>
): Promise<Horario | null> => {
  const query = `
    UPDATE horarios
    SET id_curso = $1,
        pabellon = $2,
        nro_aula = $3,
        dia_semana = $4,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_horario = $5
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.id_curso,
    data.pabellon,
    data.nro_aula,
    data.dia_semana,
    id,
  ]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deleteHorario = async (id: number): Promise<Horario | null> => {
  const query = `
    UPDATE horarios
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_horario = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const updateHorarioPartial = async (
  id: number,
  data: Partial<Horario>
): Promise<Horario | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.id_curso !== undefined) {
    fields.push(`id_curso = $${index++}`);
    values.push(data.id_curso);
  }

  if (data.pabellon !== undefined) {
    fields.push(`pabellon = $${index++}`);
    values.push(data.pabellon);
  }

  if (data.nro_aula !== undefined) {
    fields.push(`nro_aula = $${index++}`);
    values.push(data.nro_aula);
  }

  if (data.dia_semana !== undefined) {
    fields.push(`dia_semana = $${index++}`);
    values.push(data.dia_semana);
  }

  if (fields.length === 0) return null;

  const query = `
    UPDATE horarios
    SET ${fields.join(", ")},
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_horario = $${index}
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;

  values.push(id);
  const res = await pool.query(query, values);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};


