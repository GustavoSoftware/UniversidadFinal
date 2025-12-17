-- 1. TABLA: CARRERAS
CREATE TABLE carreras (
    id_carrera SERIAL PRIMARY KEY,
    nombre_carrera VARCHAR(100) NOT NULL,
    facultad VARCHAR(100),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 2. TABLA: PROFESORES
CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    pago_mensual DECIMAL(10,2),
    id_carrera INT REFERENCES carreras(id_carrera),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 3. TABLA: ALUMNOS
CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    ciclo INT,
    id_carrera INT REFERENCES carreras(id_carrera),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 4. TABLA: CURSOS
CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre_curso VARCHAR(100) NOT NULL,
    creditos INT,
    id_profesor INT REFERENCES profesores(id_profesor),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 5. TABLA: AULAS_HORARIOS
CREATE TABLE aulas_horarios (
    id_horario SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso),
    pabellon VARCHAR(50),
    nro_aula VARCHAR(20),
    dia_semana VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME,
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 6. TABLA: ALUMNO_CURSO
CREATE TABLE alumno_curso (
    id SERIAL PRIMARY KEY,
    id_alumno INT REFERENCES alumnos(id_alumno),
    id_curso INT REFERENCES cursos(id_curso),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 7. TABLA: CALIFICACIONES
CREATE TABLE calificaciones (
    id_nota SERIAL PRIMARY KEY,
    id_alumno INT REFERENCES alumnos(id_alumno),
    id_curso INT REFERENCES cursos(id_curso),
    tipo_examen VARCHAR(50),
    puntaje DECIMAL(4,2),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);

-- 8. TABLA: PAGOS
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    tipo_persona VARCHAR(20) CHECK (tipo_persona IN ('ALUMNO', 'PROFESOR')),
    id_persona INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    concepto VARCHAR(200),
    estado_auditoria VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_creacion VARCHAR(50),
    usuario_modificacion VARCHAR(50)
);