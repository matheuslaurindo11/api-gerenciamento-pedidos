# API de Gerenciamento de Pedidos

**Projeto acadêmico — Tópicos Avançados em Sistemas de Informação II**

## 1. Identificação

- **Aluno:** Matheus Laurindo
- **RGM:** 42405220
- **Tecnologia principal:** Node.js
- **Framework:** Express
- **Linguagem:** JavaScript

## 2. Descrição do projeto

A API de Gerenciamento de Pedidos foi desenvolvida para permitir o cadastro, a consulta, a listagem e a atualização de status de pedidos.

O projeto utiliza Node.js e Express, com organização em camadas para separar as responsabilidades de rotas, controladores e serviços.

Os dados são armazenados em memória durante a execução da aplicação.

## 3. Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- Jest
- Supertest
- Postman
- Git e GitHub

## 4. Instalação e execução

### Pré-requisitos

- Node.js versão 18 ou superior.
- npm.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/matheuslaurindo11/api-gerenciamento-pedidos.git
```

Entre na pasta:

```bash
cd api-gerenciamento-pedidos
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3000
```

## 5. Endpoints disponíveis

| Método | Rota | Descrição |
|---|---|---|
| POST | `/pedidos` | Cadastrar um pedido |
| GET | `/pedidos` | Listar todos os pedidos |
| GET | `/pedidos/:id` | Consultar pedido pelo ID |
| PATCH | `/pedidos/:id/status` | Atualizar o status do pedido |

### 5.1 Cadastro de pedido

**POST /pedidos**

Exemplo de corpo JSON:

```json
{
  "cliente": "João Silva",
  "valor": 150.00,
  "tipo": "entrega",
  "prioridade": "normal"
}
```

Retorno esperado: HTTP 201.

### 5.2 Listagem de pedidos

**GET /pedidos**

Retorna os pedidos cadastrados.

Retorno esperado: HTTP 200.

### 5.3 Consulta de pedido

**GET /pedidos/:id**

Consulta um pedido pelo identificador.

- Pedido encontrado: HTTP 200.
- Pedido inexistente: HTTP 404.

### 5.4 Atualização de status

**PATCH /pedidos/:id/status**

Exemplo de corpo JSON:

```json
{
  "status": "em_preparacao"
}
```

A atualização depende das transições de status permitidas pela aplicação.

## 6. Validações implementadas

A API possui validações para:

- Campo de cliente obrigatório.
- Valor numérico maior que zero.
- Tipo de pedido válido.
- Prioridade válida.
- Status permitido.
- Transições de status válidas.
- Identificação de pedidos inexistentes.
- Tratamento de JSON malformado.

Os principais códigos HTTP utilizados são:

| Código | Significado |
|---|---|
| 200 | Operação realizada com sucesso |
| 201 | Pedido criado |
| 400 | Dados inválidos |
| 404 | Pedido não encontrado |
| 500 | Erro interno do servidor |

## 7. Arquitetura do projeto

O projeto foi organizado em camadas:

```text
src/
├── app.js
├── server.js
├── controllers/
│   └── pedidos.controller.js
├── routes/
│   └── pedidos.routes.js
└── services/
    └── pedidos.service.js

tests/
└── pedidos.test.js

evidencias/
```

**Responsabilidades:**

- **Routes:** definem os caminhos e métodos HTTP.
- **Controllers:** recebem as requisições e retornam as respostas.
- **Services:** concentram as regras de negócio e validações.
- **App:** configura o Express e os tratamentos de erro.
- **Server:** inicia o servidor.
- **Tests:** verificam o comportamento dos endpoints.

O padrão utilizado é uma arquitetura em camadas, separando as responsabilidades da aplicação.

## 8. Testes automatizados

Os testes foram desenvolvidos com Jest e Supertest.

Para executar:

```bash
npm test
```

Durante o desenvolvimento, foram executados e aprovados **13 testes automatizados**.

Os testes verificam:

1. Criação de pedidos válidos.
2. Rejeição de clientes vazios.
3. Rejeição de valores menores ou iguais a zero.
4. Rejeição de valores negativos.
5. Rejeição de tipos inválidos.
6. Rejeição de prioridades inválidas.
7. Listagem de pedidos.
8. Consulta de pedidos inexistentes.
9. Atualização de status.
10. Rejeição de transições de status inválidas.
11. Rejeição de status desconhecidos no PATCH.
12. Atualização de pedido inexistente.
13. Rejeição de JSON malformado.

## 9. Evidências dos testes no Postman

A pasta `evidencias/` contém capturas de tela dos testes manuais realizados no Postman:

- `01-criacao.png` — Cadastro de pedido.
- `02-validacao.png` — Validação de dados inválidos.
- `03-listagem.png` — Listagem de pedidos.
- `04-consulta-inexistente.png` — Consulta de pedido inexistente.
- `05-atualizacao.png` — Atualização de status.

## 10. Controle de versão

O projeto utiliza Git para controle de versão e GitHub para hospedagem do código-fonte.

Repositório:

https://github.com/matheuslaurindo11/api-gerenciamento-pedidos

O histórico de commits registra a evolução e as melhorias realizadas durante o desenvolvimento.

## 11. Utilização de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto.

As principais atividades realizadas com esse apoio foram:

- Esclarecimento de conceitos de Node.js e Express.
- Apoio na organização da arquitetura em camadas.
- Orientação na implementação de validações.
- Auxílio na elaboração e revisão dos testes automatizados.
- Apoio na documentação do projeto.

As sugestões foram analisadas e adaptadas conforme as necessidades da atividade. O código e os testes foram executados para verificar o funcionamento da aplicação.

## 12. Limitações do projeto

Os pedidos são armazenados em memória. Portanto, os dados cadastrados são perdidos quando o servidor é reiniciado.

Essa abordagem foi utilizada para atender ao escopo acadêmico da atividade, sem necessidade de integração com banco de dados.

## 13. Considerações finais

O desenvolvimento deste projeto permitiu aplicar conhecimentos de Node.js, Express, arquitetura em camadas, validação de dados, testes automatizados, testes manuais com Postman e controle de versão com Git e GitHub.

A API atende às funcionalidades propostas na atividade de gerenciamento de pedidos.
