# TechAcademy7

Projeto escolar com:
- backEnd: Node.js + Express + Sequelize + MySQL
- App: React Native + Expo

Guia essencial para configurar .env, definir o IP correto para rodar no celular físico e executar o back-end e o app.

---

## Requisitos

- Docker Desktop (usaremos Docker Compose para banco + API)
- Node.js 18+ e npm 9+ (para rodar o App/Expo)
- Git
- Celular e computador na mesma rede (Wi‑Fi ou hotspot do celular)

---

## Estrutura

- backEnd/ → API
- App/ → Aplicativo mobile
- .env (raiz) → variáveis do Docker Compose (MySQL)

---

## Variáveis de ambiente (.env)

1) Raiz do projeto (.env) – usado pelo Docker Compose no MySQL:
```properties
MYSQL_ROOT_PASSWORD=123456
MYSQL_DATABASE=tech_Academy7
MYSQL_ROOT_HOST=%
```

2) backEnd/.env – conexão ao MySQL e chaves da API:
```properties
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

3) App/.env – URL da API acessível pelo celular:
```properties
BASE_URL=http://SEU_IP_DO_PC:3000
```
Como descobrir o IP do seu PC (Windows):
- Abra o PowerShell e execute: ipconfig
- Copie o “Endereço IPv4” (ex.: 192.168.1.4)
- Teste no navegador do celular: http://192.168.1.4:3000

---

## Executar o back-end (com Docker Compose)

- Na raiz do projeto:
```bash
docker compose up -d --build
```
- Ver logs da API:
```bash
docker compose logs -f backend
```
- Parar tudo:
```bash
docker compose down
```

Requisitos de rede:
- A API deve escutar em todas as interfaces:
```ts
// backEnd/src/index.ts ou app.ts
app.listen(3000, '0.0.0.0', () => console.log('API ouvindo na porta 3000'));
```
- Libere a porta 3000 no firewall (se necessário):
```powershell
netsh advfirewall firewall add rule name="Node 3000" dir=in action=allow protocol=TCP localport=3000
```

Dica: Se preferir rodar sem Docker, entre em backEnd/, rode npm install e npm run dev (certifique-se de apontar DB_HOST=localhost em backEnd/.env).

---

## Executar o App (Expo)

1) Dependências:
```bash
cd App
npm install
```

2) Configure App/.env com o IP do seu PC:
```properties
BASE_URL=http://SEU_IP_DO_PC:3000
```

3) Garanta o plugin de env no Babel (essencial):
```js
// App/babel.config.js
plugins: [
  ["module:react-native-dotenv", { moduleName: "@env", path: ".env", allowUndefined: false }]
]
```

4) Tipos do @env (TypeScript):
```ts
// App/env.d.ts
declare module '@env' {
  export const BASE_URL: string;
}
```

5) Inicie o Expo (cache limpo):
```bash
npx expo start -c
```
Abra o app no celular físico pelo QR Code. O celular precisa estar na mesma rede que o PC (ou o PC conectado ao hotspot do celular).

---

## Testes rápidos

- No celular, abra no navegador: http://SEU_IP_DO_PC:3000
  - Se responder, o App consegue acessar a API.
- No Metro/console do App, confira o log do Axios (se implementado): 
  [ApiAxios] BASE_URL= ... -> usando: ...

---

## Fluxo “Esqueci minha senha”

- POST /request-password-reset
  - Body: { "email": "email@exemplo.com", "cpf": "somente_digitos" }
  - Em desenvolvimento retorna token e expiresAt para testes.
- POST /reset-password
  - Body: { "email": "...", "cpf": "somente_digitos", "token": "JWT", "newPassword": "nova_senha" }
- Tokens são validados contra um segredo dinâmico (baseado no hash atual da senha). Ao alterar a senha, tokens anteriores são invalidados.

---

## Dicas de rede (celular físico)

- BASE_URL deve apontar para o IP do computador, não 10.0.2.2 nem localhost.
- Em hotspot do celular: conecte o PC ao Wi‑Fi do celular e use o IP do PC nessa rede (ipconfig).
- Se a rede bloquear, use ngrok:
```bash
npx ngrok http 3000
# Aponte BASE_URL para a URL do ngrok
```

---

## Erros comuns

- App não chama a API:
  - BASE_URL incorreto (use IP do PC).
  - Expo com cache antigo (npx expo start -c).
  - API não ouvindo em 0.0.0.0 ou porta 3000 bloqueada no firewall.

- “RESET_PASSWORD_SECRET não configurado.”:
  - Defina no backEnd/.env e reinicie os containers.

- Login não aceita nova senha:
  - Garanta que a senha está sendo hasheada corretamente (hooks no modelo ou hash no controller).
  - Coluna password do MySQL deve aceitar 60+ caracteres.

---

## Scripts úteis

- Back-end (sem Docker):
  - Dev: dentro de backEnd/ → npm install && npm run dev
  - Prod: npm run build && npm start
- App:
  - cd App && npm install && npx expo start -c
- Docker Compose:
  - Subir: docker compose up -d --build
  - Logs: docker compose logs -f backend
  - Parar: docker compose down