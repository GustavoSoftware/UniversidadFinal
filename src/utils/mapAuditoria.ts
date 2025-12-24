import { formatearFecha } from "./formateador.fecha";

export const mapAuditoria = (row: any) => ({
  ...row,
  fecha_creacion: formatearFecha(row.fecha_creacion),
  fecha_modificacion: formatearFecha(row.fecha_modificacion),
});
