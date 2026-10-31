const request = require('supertest');
const app = require('../src/app');
const pedidosService = require('../src/services/pedidos.service');

beforeEach(() => {
  pedidosService.limparPedidos();
});

describe('API de Gerenciamento de Pedidos', () => {
  const pedidoValido = {
    cliente: 'Carlos Silva',
    tipo: 'entrega',
    valor: 350,
    prioridade: 'normal'
  };

  test('POST /pedidos cria um pedido válido com HTTP 201', async () => {
    const resposta = await request(app).post('/pedidos').send(pedidoValido);
    expect(resposta.status).toBe(201);
    expect(resposta.body).toMatchObject({
      id: 1,
      cliente: 'Carlos Silva',
      status: 'recebido'
    });
  });

  test('POST /pedidos rejeita cliente vazio com HTTP 400', async () => {
    const resposta = await request(app).post('/pedidos').send({ ...pedidoValido, cliente: '   ' });
    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toMatch(/cliente/i);
  });

  test('POST /pedidos rejeita valor menor ou igual a zero', async () => {
    const resposta = await request(app).post('/pedidos').send({ ...pedidoValido, valor: 0 });
    expect(resposta.status).toBe(400);
  });

  test('GET /pedidos lista os pedidos cadastrados', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).get('/pedidos');
    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(1);
  });

  test('GET /pedidos/:id retorna 404 para pedido inexistente', async () => {
    const resposta = await request(app).get('/pedidos/999');
    expect(resposta.status).toBe(404);
  });

  test('PATCH /pedidos/:id/status atualiza o status para em_preparacao', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).patch('/pedidos/1/status').send({ status: 'em_preparacao' });
    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('em_preparacao');
  });

  test('PATCH rejeita uma transição de status inválida', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).patch('/pedidos/1/status').send({ status: 'entregue' });
    expect(resposta.status).toBe(400);
  });

  test('POST /pedidos rejeita valor negativo', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, valor: -10 });

    expect(resposta.status).toBe(400);
  });

  test('POST /pedidos rejeita tipo inválido', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, tipo: 'invalido' });

    expect(resposta.status).toBe(400);
  });

  test('POST /pedidos rejeita prioridade inválida', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, prioridade: 'invalida' });

    expect(resposta.status).toBe(400);
  });

  test("PATCH rejeita status inválido com HTTP 400", async () => {
    await request(app).post("/pedidos").send(pedidoValido);
    const resposta = await request(app).patch("/pedidos/1/status").send({ status: "desconhecido" });
    expect(resposta.status).toBe(400);
  });

  test("PATCH retorna HTTP 404 para pedido inexistente", async () => {
    const resposta = await request(app).patch("/pedidos/999/status").send({ status: "cancelado" });
    expect(resposta.status).toBe(404);
  });

});
