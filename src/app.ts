import express from "express";
import carreraRoutes from "./routes/carrera.routes";
import alumnoRoutes from "./routes/alumno.routes";
import profesorRoutes from "./routes/profesor.routes";
import cursoRoutes from "./routes/curso.routes";
import horarioRoutes from "./routes/horario.routes";
import alumnoCursoRoutes from "./routes/alumnoCurso.routes";
import calificacionRoutes from "./routes/calificaciones.routes";
import pagoRoutes from "./routes/pago.routes";
import usuarioRoutes from "./routes/usuario.route";
import authRoute from "./routes/auth.route";
import dotenv from "dotenv";
import { requireAuth } from "./middlewares/auth.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(express.json());
const prefix = "/api/v1";

//RUTA SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//RUTA PUBLICA DE AUTENTICACION
app.use(`${prefix}/auth`, authRoute);

//RUTA PUBLICA REGISTER
app.use(`${prefix}/usuarios`, usuarioRoutes);

//RUTAS PROTEGIDAS
app.use(`${prefix}/carreras`, requireAuth, carreraRoutes);
app.use(`${prefix}/alumnos`, requireAuth, alumnoRoutes);
app.use(`${prefix}/profesores`, requireAuth, profesorRoutes);
app.use(`${prefix}/cursos`, requireAuth, cursoRoutes);
app.use(`${prefix}/horarios`, requireAuth, horarioRoutes);
app.use(`${prefix}/matriculas`, requireAuth, alumnoCursoRoutes);
app.use(`${prefix}/calificaciones`, requireAuth, calificacionRoutes);
app.use(`${prefix}/pagos`, requireAuth, pagoRoutes);

app.listen(3000, () => {
  console.log("Servidor de la Universidad corriendo en el puerto 3000");
  console.log("Puedes probar: http://localhost:3000/api/v1/alumnos");
});
