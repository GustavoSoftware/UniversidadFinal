import { pool } from "../database";
import { Carrera } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllCarreras = async (): Promise<Carrera[]> => {
  const query = `
    SELECT *
    FROM carreras
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getCarreraById = async (id: number): Promise<Carrera | null> => {
  const query = `
    SELECT *
    FROM carreras
    WHERE id_carrera = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createCarrera = async (
  data: Partial<Carrera>
): Promise<Carrera> => {
  const query = `
    INSERT INTO carreras (nombre_carrera, facultad, usuario_creacion)
    VALUES ($1, $2, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [data.nombre_carrera, data.facultad]);
  return mapAuditoria(res.rows[0]);
};

export const updateCarrera = async (
  id: number,
  data: Partial<Carrera>
): Promise<Carrera | null> => {
  const query = `
    UPDATE carreras
    SET nombre_carrera = $1,
        facultad = $2,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_carrera = $3
    RETURNING *
  `;
  const res = await pool.query(query, [data.nombre_carrera, data.facultad, id]);
  return mapAuditoria(res.rows[0]) || null;
};

export const deleteCarrera = async (id: number): Promise<Carrera | null> => {
  const query = `
    UPDATE carreras
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_carrera = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return mapAuditoria(res.rows[0]) || null;
};

export const updateCarreraPartial = async (
  id: number,
  data: Partial<Carrera>
): Promise<Carrera | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.nombre_carrera !== undefined) {
    fields.push(`nombre_carrera = $${index++}`);
    values.push(data.nombre_carrera);
  }

  if (data.facultad !== undefined) {
    fields.push(`facultad = $${index++}`);
    values.push(data.facultad);
  }

  if (fields.length === 0) {
    return null;
  }

  const query = `
    UPDATE carreras
    SET ${fields.join(", ")},
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_carrera = $${index}
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;

  values.push(id);

  const res = await pool.query(query, values);

  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
