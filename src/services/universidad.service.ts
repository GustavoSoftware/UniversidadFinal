
import { pool } from "../database"; 

// ... (Todo el resto de tu código de getAll, getById, etc.)

/**
 * Mapeo automático de nombres de tablas a sus llaves primarias.
 * Esto evita errores al llamar a getById, update o delete.
 */
const obtenerIdCampo = (tabla: string): string => {
    const mapeo: { [key: string]: string } = {
        'carreras': 'id_carrera',
        'profesores': 'id_profesor',
        'alumnos': 'id_alumno',
        'cursos': 'id_curso',
        'aulas_horarios': 'id_horario',
        'alumno_curso': 'id',
        'calificaciones': 'id_nota',
        'pagos': 'id_pago'
    };
    return mapeo[tabla] || 'id';
};

// 1. Obtener todos los registros
export const getAll = async (tabla: string) => {
    // Corregido: En tu SQL pusimos 'fecha_creacion', no 'id_creacion'
    const query = `SELECT * FROM ${tabla} WHERE estado_auditoria = 'ACTIVO' ORDER BY fecha_creacion DESC`;
    const res = await pool.query(query);
    return res.rows;
};

// 2. Obtener por ID con mapeo automático
export const getById = async (tabla: string, id: number) => {
    const idCampo = obtenerIdCampo(tabla);
    const query = `SELECT * FROM ${tabla} WHERE ${idCampo} = $1 AND estado_auditoria = 'ACTIVO'`;
    const res = await pool.query(query, [id]);
    return res.rows[0] || null;
};

// 3. Crear registro
export const create = async (tabla: string, datos: any) => {
    const campos = Object.keys(datos);
    const valores = Object.values(datos);
    const placeholders = campos.map((_, i) => `$${i + 1}`).join(", ");
    const columnas = campos.join(", ");

    const query = `
        INSERT INTO ${tabla} (${columnas}, usuario_creacion) 
        VALUES (${placeholders}, 'admin_user') 
        RETURNING *`;

    const res = await pool.query(query, valores);
    return res.rows[0];
};

// 4. Actualizar registro
export const update = async (tabla: string, id: number, datos: any) => {
    const idCampo = obtenerIdCampo(tabla);
    const campos = Object.keys(datos);
    const valores = Object.values(datos);
    
    const setQuery = campos.map((campo, i) => `${campo} = $${i + 1}`).join(", ");
    
    const query = `
        UPDATE ${tabla} 
        SET ${setQuery}, fecha_modificacion = CURRENT_TIMESTAMP, usuario_modificacion = 'admin_user'
        WHERE ${idCampo} = $${campos.length + 1}
        RETURNING *`;

    const res = await pool.query(query, [...valores, id]);
    return res.rows[0] || null;
};

// 5. Eliminación lógica
export const deleteLogic = async (tabla: string, id: number) => {
    const idCampo = obtenerIdCampo(tabla);
    const query = `
        UPDATE ${tabla} 
        SET estado_auditoria = 'INACTIVO', fecha_modificacion = CURRENT_TIMESTAMP 
        WHERE ${idCampo} = $1 
        RETURNING *`;
        
    const res = await pool.query(query, [id]);
    return res.rows[0] || null;
};