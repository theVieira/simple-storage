# Simple Storage

### Armazenamento simples de arquivos

#### Requisitos

- nvm | node v20.16.0
- docker && docker-compose

#### Deploy

- `git clone https://github.com/theVieira/simple-storage.git`

- `cd simple-storage`

- `docker-compose up -d`

- `nvm use`

- `cp .env.example .env`

- Insira as variáveis de ambiente no _.env_

- `yarn install`

- `yarn start`

Pronto sua API está rodando

#### Endpoints

- GET / > Todos os arquivos

- POST / > Salva um arquivo

  - body: multipart formdata
  - enviar o arquivo com a chave: **file**

- GET /download/:id > Retorna o arquivo pronto para baixa-lo

- DELETE /:id > Deleta o arquivo
