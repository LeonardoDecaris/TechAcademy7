import express from 'express';
import cors from "cors";
import cargaRoutes from './routes/carga.routes';
import caminhoneiroRoutes from './routes/caminhoneiro.routes';
import empresaRoutes from './routes/empresa.routes';
import freteRoutes from './routes/frete.routes';
import imagemCargaRoutes from './routes/imagem_carga.routes';
import imagemEmpresaRoutes from './routes/imagem_empresa.routes';
import imagemUsuarioRoutes from './routes/imagem_usuario.routes';
import statusRoutes from './routes/status.routes';
import usuarioRoutes from './routes/usuario.routes';
import veiculoRoutes from './routes/veiculo.routes';

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cargaRoutes);
app.use(caminhoneiroRoutes);
app.use(empresaRoutes);
app.use(freteRoutes);
app.use(imagemCargaRoutes);
app.use(imagemEmpresaRoutes);
app.use(imagemUsuarioRoutes);
app.use(statusRoutes);
app.use(usuarioRoutes);
app.use(veiculoRoutes);

export default app;