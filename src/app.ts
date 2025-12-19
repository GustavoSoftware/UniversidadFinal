import express from "express";
import universidadRoutes from "./routes/universidad.route";
import carreraRoutes from './routes/carrera.routes'

const app = express();
app.use(express.json());

app.use("/api/v1", universidadRoutes);
app.use("/api/v1/carreras", carreraRoutes);


app.listen(3000, () => {
  console.log("Servidor de la Universidad corriendo en el puerto 3000");
  console.log("Puedes probar: http://localhost:3000/api/v1/alumnos");
});