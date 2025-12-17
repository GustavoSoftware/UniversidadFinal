import express from "express";
import universidadRoutes from "./routes/universidad.route";

const app = express();
app.use(express.json());

// Prefijo de la API
app.use("/api/v1", universidadRoutes);

app.listen(3000, () => {
  console.log("Servidor de la Universidad corriendo en el puerto 3000");
  console.log("Puedes probar: http://localhost:3000/api/v1/alumnos");
});