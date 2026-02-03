# WebComissao

Sistema de gerenciamento de comissões de vendedores.

## ⚠️ OBSERVAÇÃO IMPORTANTE

**Os arquivos `.env` não estão versionados no repositório por questões de segurança.** Você precisará configurar as variáveis de ambiente antes de executar o projeto.

## 🚀 Tecnologias

### Backend (API)

- **Framework**: [AdonisJS](https://adonisjs.com/) v6
- **ORM**: Lucid
- **Banco de Dados**: PostgreSQL 16
- **Linguagem**: TypeScript

### Frontend

- **Framework**: [React](https://react.dev/) v19
- **UI Library**: [Material-UI (MUI)](https://mui.com/) v7
- **Linguagem**: TypeScript

## 📦 Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Configuração Inicial

Antes de executar o projeto, configure as variáveis de ambiente:

#### 1. API (Backend)

```bash
cd api/api-web-comissao
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis conforme necessário:

```env
TZ=UTC
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=seu_app_key_aqui
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=webcomissao
DB_SSL=false  # true para conexões com SSL (produção)
```

#### 2. Frontend (se necessário)

```bash
cd app/app-comissao-web
cp .env.example .env
```

Configure as variáveis do frontend conforme os arquivos `.env.example`.

### Executando

```bash
docker compose up -d
```

Aguarde o build e inicialização dos containers. A aplicação estará disponível em:

- **Frontend**: http://localhost
- **API**: http://localhost:3333

### Credenciais Padrão

Após a inicialização, um usuário admin será criado automaticamente:

- **Email**: `admin@webcomissao.com`
- **Senha**: `admin123`

## 🏗️ Estrutura do Projeto

```
WebComissao/
├── api/
│   └── api-web-comissao/        # Backend AdonisJS
│       ├── app/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── services/
│       │   └── validators/
│       ├── database/
│       │   ├── migrations/
│       │   └── seeders/
│       └── Dockerfile
├── app/
│   └── app-comissao-web/        # Frontend React
│       ├── src/
│       └── Dockerfile
└── docker-compose.yml
```

## 🛠️ Comandos Úteis

### Parar os containers

```bash
docker compose down
```

### Ver logs

```bash
# Todos os serviços
docker compose logs -f

# Apenas API
docker logs webcomissao_api -f

# Apenas Frontend
docker logs webcomissao_frontend -f

# Apenas PostgreSQL
docker logs webcomissao_postgres -f
```

### Reconstruir os containers

```bash
docker compose up --build -d
```

### Remover volumes (apaga dados do banco)

```bash
docker compose down -v
```

## 📝 Desenvolvimento

### API Local (sem Docker)

```bash
cd api/api-web-comissao
npm install
npm run dev
```

### Frontend Local (sem Docker)

```bash
cd app/app-comissao-web
npm install
npm start
```

## 🗃️ Banco de Dados

As migrations e seeds são executados automaticamente quando a API é iniciada dentro do Docker.

### Portas

- **PostgreSQL**: `5455` (host) → `5432` (container)

### Conexão direta ao banco

```bash
docker exec -it webcomissao_postgres psql -U postgres -d webcomissao
```
