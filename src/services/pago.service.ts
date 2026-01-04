import { pool } from "../database";
import { Pago } from "../models/universidad.model";
import { mapAuditoria } from "../utils/mapAuditoria";

export const getAllPagos = async (): Promise<Pago[]> => {
  const query = `
    SELECT *
    FROM pago
    WHERE estado_auditoria = 'ACTIVO'
    ORDER BY fecha_pago DESC
  `;
  const res = await pool.query(query);
  return res.rows.map(mapAuditoria);
};

export const getPagoById = async (id: number): Promise<Pago | null> => {
  const query = `
    SELECT *
    FROM pago
    WHERE id = $1
      AND estado_auditoria = 'ACTIVO'
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const createPago = async (
  data: Partial<Pago>
): Promise<Pago> => {
  const query = `
    INSERT INTO pago (
      id_alumno,
      monto,
      concepto,
      fecha_pago,
      metodo_pago,
      usuario_creacion
    )
    VALUES ($1, $2, $3, $4, $5, 'admin_user')
    RETURNING *
  `;
  const values = [
    data.id_alumno,
    data.monto,
    data.concepto,
    data.fecha_pago,
    data.metodo_pago,
  ];

  const res = await pool.query(query, values);
  return mapAuditoria(res.rows[0]);
};

export const updatePago = async (
  id: number,
  data: Partial<Pago>
): Promise<Pago | null> => {
  const query = `
    UPDATE pago
    SET monto = COALESCE($1, monto),
        concepto = COALESCE($2, concepto),
        fecha_pago = COALESCE($3, fecha_pago),
        metodo_pago = COALESCE($4, metodo_pago),
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id = $5
      AND estado_auditoria = 'ACTIVO'
    RETURNING *
  `;
  const values = [
    data.monto,
    data.concepto,
    data.fecha_pago,
    data.metodo_pago,
    id,
  ];

  const res = await pool.query(query, values);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};

export const deletePago = async (id: number): Promise<Pago | null> => {
  const query = `
    UPDATE pago
    SET estado_auditoria = 'INACTIVO',
        fecha_modificacion = CURRENT_TIMESTAMP,
        usuario_modificacion = 'admin_user'
    WHERE id = $1
    RETURNING *
  `;
  const res = await pool.query(query, [id]);
  return res.rows[0] ? mapAuditoria(res.rows[0]) : null;
};
