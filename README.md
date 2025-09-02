# TechAcademy7

Projeto escolar composto por:
- backEnd (Node.js + Express + Sequelize + MySQL)
- App (React Native + Expo)

Este guia explica, passo a passo, como configurar as variáveis de ambiente (.env), descobrir o IP da rede para rodar no celular físico, iniciar via Docker Compose e executar o App.

---

## Sumário
- [Requisitos](#requisitos)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Configurando variáveis de ambiente (.env)](#configurando-variáveis-de-ambiente-env)
  - [Raiz/.env (Docker Compose)](#raizenv-docker-compose)
  - [backEnd/.env](#backendenv)
  - [App/.env](#appenenv)
  - [Como descobrir o IP do seu computador](#como-descobrir-o-ip-do-seu-computador)
- [Executando com Docker Compose (API + MySQL)](#executando-com-docker-compose-api--mysql)
- [Executando o back-end sem Docker (opcional)](#executando-o-back-end-sem-docker-opcional)
- [Executando o App (Expo/React Native)](#executando-o-app-exporeact-native)
- [Fluxo: Esqueci minha senha](#fluxo-esqueci-minha-senha)
- [Dicas de rede (celular físico)](#dicas-de-rede-celular-físico)
- [Erros comuns e soluções](#erros-comuns-e-soluções)
- [Scripts úteis](#scripts-úteis)

---

## Requisitos
- Docker Desktop (com Docker Compose)
- Node.js 18+ e npm 9+ (para o App/Expo)
- Git
- MySQL 8 (se não usar Docker, opcional)

---

## Estrutura do projeto
```
TechAcademy7/
├─ backEnd/                  # API Node/Express
│  ├─ src/
│  ├─ package.json
│  ├─ .env                   # variáveis do backEnd
│  └─ Dockerfile
├─ App/                      # App React Native (Expo)
│  ├─ src/
│  ├─ package.json
│  ├─ babel.config.js        # plugin react-native-dotenv
│  ├─ env.d.ts               # tipos do @env
│  └─ .env                   # BASE_URL do back-end
├─ .env                      # variáveis do Docker Compose (MySQL)
└─ docker-compose.yml        # orquestra MySQL + back-end
```

---

## Configurando variáveis de ambiente (.env)

### Raiz/.env (Docker Compose)
Este arquivo alimenta o serviço MySQL do Compose.
Exemplo:
```
MYSQL_ROOT_PASSWORD=123456
MYSQL_DATABASE=tech_Academy7
MYSQL_ROOT_HOST=%
```

### backEnd/.env
Aponte o host do MySQL para o serviço do Compose (database). Exemplo:
```
DB_HOST=database
DB_PORT=3306
DB_USER=root
DB_PASS=123456
DB_NAME=tech_Academy7

# JWT
JWT_SECRET=123456
JWT_EXPIRES_IN=1d
JWT_ISSUER=tech_Academy7

# Reset de senha (JWT sem salvar token no banco)
RESET_PASSWORD_SECRET=uma-chave-bem-forte
RESET_TOKEN_EXP_MIN=15
```
Observações:
- Use uma chave forte em RESET_PASSWORD_SECRET (string longa e aleatória).
- O back-end deve carregar o .env no início (dotenv.config).

### App/.env
O App precisa acessar a API pelo IP do SEU COMPUTADOR. Em celular físico, use o IP do PC na rede:
```
BASE_URL=http://SEU_IP_DO_PC:3000
```
Exemplo real:
```
BASE_URL=http://192.168.1.4:3000
```

### Como descobrir o IP do seu computador
No Windows:
1. Abra o PowerShell e execute:
   ```
   ipconfig
   ```
2. Procure “Endereço IPv4” da interface conectada (Wi‑Fi/Ethernet). Ex.: 192.168.1.4
3. Coloque esse IP no App/.env (BASE_URL).
4. Teste no navegador do celular: http://192.168.1.4:3000

---

## Executando com Docker Compose (API + MySQL)

Crie/ajuste um docker-compose.yml na raiz:
```yaml
version: "3.9"

services:
  database:
    image: mysql:8
    container_name: techacademy7-mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_ROOT_HOST: ${MYSQL_ROOT_HOST}
    volumes:
      - db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h 127.0.0.1 -uroot -p${MYSQL_ROOT_PASSWORD} || exit 1"]
      interval: 5s
      timeout: 5s
      retries: 10

  backend:
    build:
      context: ./backEnd
      dockerfile: Dockerfile
    container_name: techacademy7-backend
    env_file:
      - ./backEnd/.env
    depends_on:
      database:
        condition: service_healthy
    ports:
      - "3000:3000"
    # Para desenvolvimento com hot-reload (se Dockerfile usa ts-node-dev/nodemon)
    volumes:
      - ./backEnd:/usr/src/app
      - /usr/src/app/node_modules

volumes:
  db_data:
```

Comandos:
- Subir (build + iniciar) em segundo plano:
  ```
  docker compose up -d --build
  ```
- Ver logs da API:
  ```
  docker compose logs -f backend
  ```
- Parar tudo:
  ```
  docker compose down
  ```

Importante:
- A API deve ouvir em 0.0.0.0 para ser acessível externamente:
  ```ts
  app.listen(3000, '0.0.0.0', () => console.log('API ouvindo na porta 3000'));
  ```
- firewall do Windows: libere a porta 3000 se necessário:
  ```
  netsh advfirewall firewall add rule name="Node 3000" dir=in action=allow protocol=TCP localport=3000
  ```

---

## Executando o back-end sem Docker (opcional)
1. Configure backEnd/.env.
2. Instale dependências:
   ```
   cd backEnd
   npm install
   ```
3. Dev:
   ```
   npm run dev
   ```
   Prod:
   ```
   npm run build
   npm start
   ```

---

## Executando o App (Expo/React Native)

1. Configure App/.env:
   ```
   BASE_URL=http://SEU_IP_DO_PC:3000
   ```
2. Garanta o plugin do dotenv no App/babel.config.js:
   ```js
   plugins: [
     ["module:react-native-dotenv", {
       moduleName: "@env",
       path: ".env",
       allowUndefined: false
     }]
   ]
   ```
3. Tipos do @env (App/env.d.ts):
   ```ts
   declare module '@env' {
     export const BASE_URL: string;
   }
   ```
4. Instale dependências e inicie o Expo com cache limpo:
   ```
   cd App
   npm install
   npx expo start -c
   ```
5. Abra o app no celular físico (QR Code do Expo). O celular deve estar na mesma rede do PC (ou o PC conectado ao hotspot do celular).

Dica: o App loga no console algo como:
```
[ApiAxios] BASE_URL= http://SEU_IP:3000 -> usando: http://SEU_IP:3000
```
Isso confirma a leitura do .env.

---

## Fluxo: Esqueci minha senha

- Solicitar:
  - POST /request-password-reset
  - Body:
    ```json
    { "email": "email@exemplo.com", "cpf": "somente_digitos" }
    ```
  - Em ambiente de desenvolvimento, a API retorna também o token e o expiresAt.

- Redefinir:
  - POST /reset-password
  - Body:
    ```json
    {
      "email": "email@exemplo.com",
      "cpf": "somente_digitos",
      "token": "token_jwt_recebido",
      "newPassword": "nova_senha"
    }
    ```
- Observações:
  - O token é um JWT assinado com segredo dinâmico (RESET_PASSWORD_SECRET + hash atual da senha).
  - Ao atualizar a senha, tokens antigos são invalidados automaticamente.
  - A senha é armazenada com hash (por hooks no modelo ou no controller, conforme implementação).

---

## Dicas de rede (celular físico)
- BASE_URL no App deve ser o IP do computador (onde a API roda), não o IP do celular.
- Em emulador Android use 10.0.2.2 (não funciona em celular físico).
- Teste no navegador do celular: http://SEU_IP_DO_PC:3000
- Se usar hotspot do celular:
  - Conecte o PC ao Wi‑Fi do celular.
  - Use o IP do PC nessa rede (ipconfig).
- Alternativa pública: ngrok
  ```
  npx ngrok http 3000
  ```
  Defina BASE_URL com a URL do ngrok (http://xxxx.ngrok-free.app).

---

## Erros comuns e soluções

- App não chama a API:
  - BASE_URL incorreto (use IP do PC).
  - Expo sem cache limpo (rode `npx expo start -c`).
  - API não ouvindo em 0.0.0.0 ou porta 3000 bloqueada no firewall.

- “RESET_PASSWORD_SECRET não configurado.”:
  - Defina no backEnd/.env e reinicie o backend/containers.

- CPF com máscara:
  - A UI mascara, mas o App envia apenas dígitos (sem . e -) para a API.

- Login não aceita nova senha:
  - Verifique se a senha foi hasheada corretamente (hooks no modelo ou hash no controller).
  - Garanta que a coluna `password` (MySQL) suporta 60+ caracteres (bcrypt ~60 chars).

- Usando celular físico com BASE_URL localhost/10.0.2.2:
  - Não funciona. Use o IP do PC (ex.: 192.168.x.x).

---

## Scripts úteis

Back-end:
- Dev:
  ```
  cd backEnd
  npm install
  npm run dev
  ```
- Prod:
  ```
  npm run build
  npm start
  ```

App:
```
cd App
npm install
npx expo start -c
```

Docker Compose:
```
docker compose up -d --build
docker compose logs -f backend
docker compose down
```

---

Qualquer dúvida, verifique IP, portas e .env. Se precisar, descreva sua topologia de rede (Wi‑Fi, hotspot, Docker)