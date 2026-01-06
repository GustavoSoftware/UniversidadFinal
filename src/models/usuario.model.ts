export interface Usuario {
  id_usuario: number;
  username: string;
  password: string;
  rol: "ADMIN" | "SECRETARIA" | "DOCENTE";
  estado_auditoria: "ACTIVO" | "INACTIVO";
  fecha_creacion: Date;
  fecha_modificacion?: Date;
  usuario_creacion?: number;
  usuario_modificacion?: number;
}
