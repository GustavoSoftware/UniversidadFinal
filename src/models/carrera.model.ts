export interface Carrera {
  id_carrera: number;
  nombre_carrera: string;
  facultad?: string;
  estado_auditoria: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  usuario_creacion?: string;
  usuario_modificacion?: string;
}
