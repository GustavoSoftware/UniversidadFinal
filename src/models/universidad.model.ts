export interface Auditoria {
  estado_auditoria?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
  usuario_creacion?: string;
  usuario_modificacion?: string;
}

export interface Carrera extends Auditoria { id_carrera: number; nombre_carrera: string; facultad: string; }
export interface Profesor extends Auditoria { id_profesor: number; nombres: string; apellidos: string; email: string; pago_mensual: number; id_carrera: number; }
export interface Alumno extends Auditoria { id_alumno: number; nombres: string; apellidos: string; email: string; ciclo: number; id_carrera: number; }
export interface Curso extends Auditoria { id_curso: number; nombre_curso: string; creditos: number; id_profesor: number; }
export interface Horario extends Auditoria { id_horario: number; id_curso: number; pabellon: string; nro_aula: string; dia_semana: string; }
export interface AlumnoCurso extends Auditoria { id: number; id_alumno: number; id_curso: number; }
export interface Calificacion extends Auditoria { id_nota: number; id_alumno: number; id_curso: number; tipo_examen: string; puntaje: number; }
export interface Pago extends Auditoria { id_pago: number; tipo_persona: 'ALUMNO' | 'PROFESOR'; id_persona: number; monto: number; concepto: string; }