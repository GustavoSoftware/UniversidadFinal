import { pool } from "../database";
import { Usuario } from "../models/usuario.model";
import { mapAuditoria } from "../utils/mapAuditoria";
import bcrypt from "bcrypt";

export const createUsuario = async (
  data: Partial<Usuario>
): Promise<Usuario> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password!, saltRounds);

  const query = `
    INSERT INTO usuarios (username, password, rol)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const res = await pool.query(query, [
    data.username,
    hashedPassword,
    data.rol,
  ]);

  return mapAuditoria(res.rows[0]);
};

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const query = `
    SELECT *
    FROM usuarios
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
  const query = `
    SELECT *
    FROM usuarios
    WHERE id_usuario = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const updateUsuario = async (
  id: number,
  data: Partial<Usuario>,
  usuarioModificacionId: number
): Promise<Usuario | null> => {
  const query = `
    UPDATE usuarios
    SET username = $1,
        password = $2,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = $3
    WHERE id_usuario = $4
    RETURNING *
  `;

  const res = await pool.query(query, [
    data.username,
    data.password,
    usuarioModificacionId,
    id,
  ]);

  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deleteUsuario = async (id: number): Promise<Usuario | null> => {
  const query = `
    UPDATE usuarios
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_usuario = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return mapAuditoria(res.rows[0]) || null;
};

export const updateUsuarioPartial = async (
  id: number,
  data: Partial<Usuario>,
  usuarioModificacionId: number
): Promise<Usuario | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (data.username !== undefined) {
    fields.push(`username = $${index++}`);
    values.push(data.username);
  }

  if (data.password !== undefined) {
    fields.push(`password = $${index++}`);
    values.push(data.password);
  }

  if (data.rol !== undefined) {
    fields.push(`rol = $${index++}`);
    values.push(data.rol);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push(`usuario_modificacion = $${index++}`);
  values.push(usuarioModificacionId);

  const query = `
    UPDATE usuarios
    SET ${fields.join(", ")},
        fecha_modificacion = CURRENT_TIMESTAMP
    WHERE id_usuario = $${index}
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;

  values.push(id);

  const res = await pool.query(query, values);

  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
