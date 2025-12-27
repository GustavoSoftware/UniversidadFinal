export interface Profesor {
  id_profesor: number;
  nombres: string;
  apellidos: string;
  especialidad?: string;
  email?: string;
  pago_mensual?: number;
  id_carrera?: number;
  estado_auditoria: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date;
  usuario_creacion?: string;
  usuario_modificacion?: string;
}
