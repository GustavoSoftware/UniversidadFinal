import express from "express";
import universidadRoutes from "./routes/universidad.route";
import carreraRoutes from './routes/carrera.routes'
import alumnoRoutes from "./routes/alumno.routes";
import cursoRoutes from "./routes/curso.routes";
import horarioRoutes from "./routes/horario.routes";
import alumnoCursoRoutes from "./routes/alumnoCurso.routes";
import calificacionRoutes from "./routes/calificaciones.routes";
import pagoRoutes from "./routes/pago.routes";



const app = express();
app.use(express.json());

app.use("/api/v1", universidadRoutes);
app.use("/api/v1/carreras", carreraRoutes);
app.use("/api/v1/alumnos", alumnoRoutes);
app.use("/api/v1/cursos", cursoRoutes);
app.use("/api/v1/horarios", horarioRoutes);
app.use("/api/v1/matriculas", alumnoCursoRoutes);
app.use("/api/v1/calificaciones", calificacionRoutes);
app.use("/api/v1/pagos", pagoRoutes);

app.listen(3000, () => {
  console.log("Servidor de la Universidad corriendo en el puerto 3000");
  console.log("Puedes probar: http://localhost:3000/api/v1/alumnos");
});