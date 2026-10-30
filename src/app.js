const express = require('express');
const pedidosRoutes = require('./routes/pedidos.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API de Gerenciamento de Pedidos',
    versao: '1.0.0',
    rotas: {
      criar: 'POST /pedidos',
      listar: 'GET /pedidos',
      consultar: 'GET /pedidos/:id',
      atualizarStatus: 'PATCH /pedidos/:id/status'
    }
  });
});

app.use('/pedidos', pedidosRoutes);

// JSON inválido enviado no corpo da requisição.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'Corpo JSON inválido.' });
  }
  return next(err);
});

// Tratamento final de erros inesperados.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
