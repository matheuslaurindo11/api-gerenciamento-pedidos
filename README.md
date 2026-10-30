# API de Gerenciamento de Pedidos

Projeto prático avaliativo da disciplina **Tópicos Avançados em Sistemas de Informação II**.

API REST desenvolvida para cadastrar, consultar, listar e atualizar pedidos de uma pequena loja.

## 1. Tecnologias utilizadas

- Node.js e Express com JavaScript.
- Jest e Supertest para testes automatizados.
- Postman para testes manuais.
- Git e GitHub para versionamento.
- Armazenamento em memória.

## 2. Requisitos

- Node.js 18 ou superior.
- npm.

## 3. Instalação e execução

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Para desenvolvimento com reinicialização automática:

```bash
npm run dev
```

A API ficará disponível em:

`http://localhost:3000`

## 4. Arquitetura do projeto

- `src/routes/`: define as rotas e encaminha as requisições.
- `src/controllers/`: recebe as requisições HTTP e define as respostas.
- `src/services/`: contém as regras de negócio, validações e armazenamento dos pedidos.
- `src/app.js`: configura a aplicação Express e o tratamento de erros.
- `src/server.js`: inicia o servidor.
- `tests/`: contém os testes automatizados.
- `evidencias/`: armazena as capturas dos testes realizados no Postman.

A aplicação utiliza arquitetura em camadas para separar responsabilidades e facilitar a manutenção.

## 5. Endpoints

| Método | Rota | Descrição | Resposta |
|---|---|---|---|
| POST | `/pedidos` | Cadastrar pedido | 201 |
| GET | `/pedidos` | Listar pedidos | 200 |
| GET | `/pedidos/:id` | Consultar pedido | 200 ou 404 |
| PATCH | `/pedidos/:id/status` | Atualizar status | 200, 400 ou 404 |

### Exemplo de criação de pedido

Requisição: `POST /pedidos`

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta esperada: HTTP 201.

```json
{
  "id": 1,
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal",
  "status": "recebido"
}
```

### Exemplo de atualização de status

Requisição: `PATCH /pedidos/1/status`

```json
{
  "status": "em_preparacao"
}
```

## 6. Valores aceitos

- **Tipo:** `entrega`, `retirada`.
- **Prioridade:** `baixa`, `normal`, `alta`, `urgente`.
- **Status:** `recebido`, `em_preparacao`, `enviado`, `entregue`, `cancelado`.

### Transições permitidas

- `recebido` → `em_preparacao` ou `cancelado`.
- `em_preparacao` → `enviado` ou `cancelado`.
- `enviado` → `entregue` ou `cancelado`.
- `entregue` e `cancelado` são estados finais.

## 7. Validações e tratamento de erros

- Cliente obrigatório e não vazio.
- Valor numérico, finito e maior que zero.
- Tipo, prioridade e status devem pertencer aos valores permitidos.
- Identificador inexistente retorna HTTP 404.
- Dados inválidos e transições não permitidas retornam HTTP 400.
- JSON malformado retorna HTTP 400.
- Erros inesperados são tratados com HTTP 500.

## 8. Testes automatizados

Execute os testes com:

```bash
npm test
```

Durante o desenvolvimento, foram executados e aprovados **10 testes automatizados**.

Os testes verificam:
- Criação de pedidos válidos.
- Rejeição de clientes vazios.
- Rejeição de valores menores ou iguais a zero.
- Rejeição de valores negativos.
- Rejeição de tipos inválidos.
- Rejeição de prioridades inválidas.
- Listagem de pedidos.
- Consulta de pedidos inexistentes.
- Atualização de status.
- Rejeição de transições de status inválidas.

## 9. Evidências dos testes no Postman

As cinco evidências dos testes manuais devem ser armazenadas na pasta `evidencias/`:

1. `01-criacao.png` — criação válida, HTTP 201.
2. `02-validacao.png` — dados inválidos, HTTP 400.
3. `03-listagem.png` — listagem de pedidos, HTTP 200.
4. `04-consulta-inexistente.png` — consulta de pedido inexistente, HTTP 404.
5. `05-atualizacao.png` — atualização de status, HTTP 200.

As capturas devem mostrar o método, a URL, o corpo da requisição quando aplicável e a resposta da API.

## 10. Git e GitHub

O Git é utilizado para controlar as versões do projeto, enquanto o GitHub hospeda o código-fonte.

O histórico de desenvolvimento deve conter pelo menos cinco commits significativos, representando etapas reais da implementação.

## 11. Uso de inteligência artificial

A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento, auxiliando na organização da arquitetura, implementação de validações, elaboração de testes, documentação e resolução de dúvidas técnicas.

Uma sugestão aceita foi separar a aplicação em rotas, controllers e services, facilitando a organização e a manutenção do código.

A implementação foi executada e testada durante o desenvolvimento. O aluno permanece responsável por compreender e revisar o código entregue.

## 12. Limitações conhecidas

- Os pedidos são armazenados em memória.
- Os dados são perdidos quando o servidor é reiniciado.
- Não foi utilizado banco de dados, conforme permitido no enunciado.
- O professor poderá realizar testes adicionais na API.
