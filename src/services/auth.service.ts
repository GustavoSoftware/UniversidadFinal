import { pool } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const login = async (username: string, password: string) => {
  const query = `
    SELECT id_usuario, username, password, rol
    FROM usuarios
    WHERE username = $1
      AND estado_auditoria = 'ACTIVO'
  `;

  const res = await pool.query(query, [username]);

  if (res.rows.length === 0) {
    throw new Error("Credenciales inválidas");
  }

  const usuario = res.rows[0];

  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) {
    throw new Error("Credenciales inválidas");
  }

  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no definido en variables de entorno");
  }

  const payload: any = {
    id_usuario: usuario.id_usuario,
    rol: usuario.rol,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      username: usuario.username,
      rol: usuario.rol,
    },
  };
};
