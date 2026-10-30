const service = require('../services/pedidos.service');

function criar(req, res, next) {
  try {
    const resultado = service.criar(req.body);
    if (!resultado.ok) {
      return res.status(400).json({ erro: resultado.erro });
    }
    return res.status(201).json(resultado.pedido);
  } catch (erro) {
    return next(erro);
  }
}

function listar(req, res, next) {
  try {
    return res.status(200).json(service.listar());
  } catch (erro) {
    return next(erro);
  }
}

function consultarPorId(req, res, next) {
  try {
    const resultado = service.consultarPorId(req.params.id);
    if (!resultado.ok) {
      return res.status(404).json({ erro: resultado.erro });
    }
    return res.status(200).json(resultado.pedido);
  } catch (erro) {
    return next(erro);
  }
}

function atualizarStatus(req, res, next) {
  try {
    const resultado = service.atualizarStatus(req.params.id, req.body);
    if (!resultado.ok) {
      const statusHttp = resultado.tipo === 'nao_encontrado' ? 404 : 400;
      return res.status(statusHttp).json({ erro: resultado.erro });
    }
    return res.status(200).json(resultado.pedido);
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { criar, listar, consultarPorId, atualizarStatus };
