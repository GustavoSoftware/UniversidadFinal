// src/database.ts
import { Pool } from 'pg';

// ES VITAL QUE TENGA LA PALABRA 'export'
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Universidad',
  password: '123456', // Asegúrate de que esta sea tu clave real
  port: 5432,
});