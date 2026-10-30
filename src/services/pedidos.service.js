const TIPOS_VALIDOS = ['entrega', 'retirada'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta', 'urgente'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

// Transições permitidas: cada status pode avançar ou ser cancelado,
// com exceção de pedidos já entregues ou cancelados.
const TRANSICOES = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue', 'cancelado'],
  entregue: [],
  cancelado: []
};

let pedidos = [];
let proximoId = 1;

function criar(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    return { ok: false, erro: 'Envie um objeto JSON com os dados do pedido.' };
  }

  const cliente = typeof dados.cliente === 'string' ? dados.cliente.trim() : '';
  if (!cliente) {
    return { ok: false, erro: 'O campo cliente é obrigatório e não pode estar vazio.' };
  }

  if (typeof dados.valor !== 'number' || !Number.isFinite(dados.valor) || dados.valor <= 0) {
    return { ok: false, erro: 'O campo valor deve ser numérico e maior que zero.' };
  }

  if (!TIPOS_VALIDOS.includes(dados.tipo)) {
    return { ok: false, erro: `O campo tipo deve ser um destes valores: ${TIPOS_VALIDOS.join(', ')}.` };
  }

  if (!PRIORIDADES_VALIDAS.includes(dados.prioridade)) {
    return { ok: false, erro: `O campo prioridade deve ser um destes valores: ${PRIORIDADES_VALIDAS.join(', ')}.` };
  }

  const pedido = {
    id: proximoId++,
    cliente,
    tipo: dados.tipo,
    valor: dados.valor,
    prioridade: dados.prioridade,
    status: 'recebido'
  };

  pedidos.push(pedido);
  return { ok: true, pedido: { ...pedido } };
}

function listar() {
  return pedidos.map((pedido) => ({ ...pedido }));
}

function consultarPorId(idRecebido) {
  const id = Number(idRecebido);
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, erro: 'Pedido não encontrado.' };
  }

  const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) {
    return { ok: false, erro: 'Pedido não encontrado.' };
  }

  return { ok: true, pedido: { ...pedido } };
}

function atualizarStatus(idRecebido, dados) {
  const id = Number(idRecebido);
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, tipo: 'nao_encontrado', erro: 'Pedido não encontrado.' };
  }

  const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) {
    return { ok: false, tipo: 'nao_encontrado', erro: 'Pedido não encontrado.' };
  }

  if (!dados || typeof dados !== 'object' || Array.isArray(dados) ||
      typeof dados.status !== 'string' || !STATUS_VALIDOS.includes(dados.status)) {
    return {
      ok: false,
      tipo: 'validacao',
      erro: `Informe um status válido: ${STATUS_VALIDOS.join(', ')}.`
    };
  }

  if (!TRANSICOES[pedido.status].includes(dados.status)) {
    return {
      ok: false,
      tipo: 'validacao',
      erro: `Transição de "${pedido.status}" para "${dados.status}" não permitida.`
    };
  }

  pedido.status = dados.status;
  return { ok: true, pedido: { ...pedido } };
}

// Utilitário para testes: limpa o armazenamento em memória.
function limparPedidos() {
  pedidos = [];
  proximoId = 1;
}

module.exports = { criar, listar, consultarPorId, atualizarStatus, limparPedidos };
