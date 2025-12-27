import { pool } from "../database";
import { Profesor } from "../models/profesor.model";

/**
 * LISTAR PROFESORES ACTIVOS
 */
export const getAllProfesores = async (): Promise<Profesor[]> => {
  const query = `
    SELECT *
    FROM profesores
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_creacion DESC
  `;
  const res = await pool.query(query);
  return res.rows;
};

/**
 * OBTENER PROFESOR POR ID
 */
export const getProfesorById = async (id: number): Promise<Profesor | null> => {
  const query = `
    SELECT *
    FROM profesores
    WHERE id_profesor = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] || null;
};

/**
 * CREAR PROFESOR
 */
export const createProfesor = async (
  data: Partial<Profesor>
): Promise<Profesor> => {
  const query = `
    INSERT INTO profesores (
      nombres,
      apellidos,
      especialidad,
      email,
      pago_mensual,
      id_carrera,
      usuario_creacion
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'admin_user')
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombres,
    data.apellidos,
    data.especialidad,
    data.email,
    data.pago_mensual,
    data.id_carrera
  ]);
  return res.rows[0];
};

/**
 * ACTUALIZAR PROFESOR
 */
export const updateProfesor = async (
  id: number,
  data: Partial<Profesor>
): Promise<Profesor | null> => {
  const query = `
    UPDATE profesores
    SET nombres = $1,
        apellidos = $2,
        especialidad = $3,
        email = $4,
        pago_mensual = $5,
        id_carrera = $6,
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_profesor = $7
    RETURNING *
  `;
  const res = await pool.query(query, [
    data.nombres,
    data.apellidos,
    data.especialidad,
    data.email,
    data.pago_mensual,
    data.id_carrera,
    id
  ]);
  return res.rows[0] || null;
};

/**
 * ELIMINACIÓN LÓGICA
 */
export const deleteProfesor = async (id: number): Promise<Profesor | null> => {
  const query = `
    UPDATE profesores
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id_profesor = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] || null;
};
