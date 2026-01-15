import { Pool } from "pg";

//pool desde src usando variables de entorno
//este archivo ha sido creado con la finalidad de replicar el trabajo del profesor

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
