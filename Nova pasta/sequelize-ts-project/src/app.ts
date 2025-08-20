import express from 'express';
import bodyParser from 'body-parser';
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
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/carga', cargaRoutes);
app.use('/api/caminhoneiro', caminhoneiroRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/frete', freteRoutes);
app.use('/api/imagem-carga', imagemCargaRoutes);
app.use('/api/imagem-empresa', imagemEmpresaRoutes);
app.use('/api/imagem-usuario', imagemUsuarioRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/veiculo', veiculoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});