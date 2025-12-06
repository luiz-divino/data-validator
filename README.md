**API Data Validator**

Validador simples de dados para objetos de usuário em TypeScript, pensado para uso em APIs e validações de entrada no runtime. Fornece guards e funções de validação que garantem formato, tipos e regras de negócio mínimas (e-mail, tamanho do username, roles permitidos, etc.).

**Sumário**
- **Visão Geral**: o que é e por que usar.
- **Instalação**: como rodar localmente.
- **Estrutura do Projeto**: arquivos principais e responsabilidades.
- **Uso**: exemplos de execução e comportamento esperado.
- **API de Validação**: funções exportadas e contratos.
- **Tipos**: principais interfaces e aliases.
- **Como estender**: orientações para novos validadores.
- **Contribuição e Licença**.

**Visão Geral**

Este repositório contém um conjunto pequeno e direto de utilitários em TypeScript para validar dados de usuário em runtime. Ele demonstra como combinar Type Guards (para checagens estruturais) com validações de conteúdo (por exemplo: formato de e-mail, tamanho de campos e valores permitidos) e retornar um objeto tipado `IUser` ou lançar erros explicativos quando os dados não atendem aos requisitos.

O projeto é intencionalmente minimalista e serve como base para integrar validações em endpoints de API, middlewares ou scripts de transformação de dados.

**Instalação**

- Requisitos: `Node.js` e `npm`.
- Instale dependências:

```
npm install
```

- Para rodar diretamente (usa `ts-node` + loader ESM):

```
npm start
```

- Para compilar para JavaScript (TypeScript):

```
npm run build
```

**Estrutura do Projeto**

- `package.json`: scripts e dependências.
- `tsconfig.json`: configuração do TypeScript.
- `src/index.ts`: arquivo de exemplo que demonstra validações bem-sucedidas e falhas.
- `src/validators/userValidator.ts`: validador principal (`isUser`, `validateUser`) e helpers (email, role).
- `src/types/user.type.ts`: tipos relacionados ao usuário (`IUser`, `UserRole`).
- `src/types/config.type.ts`: tipos de configuração de exemplo.
- `src/types/audit.type.ts`: tipos de auditoria baseados em `IUser`.

**Uso (exemplo)**

O arquivo `src/index.ts` já contém exemplos de uso. Em resumo:

- Validando dados válidos:

```ts
const validUserData = {
	id: 'uuid-123',
	username: 'dev_divino',
	email: 'userdivino@gmail.com',
	role: 'editor',
	bio: 'Este é um usuário de teste.'
};

const safeUser: IUser = validateUser(validUserData);
// retorna o objeto tipado IUser
```

- Cenários que lançam erro:

1. Estrutura inválida (faltam campos obrigatórios) → `validateUser` lança erro.
2. `username` com menos de 5 caracteres → lança erro com mensagem explicativa.
3. E-mail em formato inválido → lança erro.
4. `role` fora das opções `admin | editor | viewer` → `isUser` falha e `validateUser` lança erro.

No console, o `src/index.ts` demonstra esses casos e captura as exceções para exibir mensagens legíveis.

**API de Validação**

- `isUser(data: any): data is IUser`:
	- Type Guard que checa a estrutura básica: presença e tipos de `id`, `username`, `email` e `role`.
	- Retorna `true` se `data` possuir a forma mínima de um `IUser` e `role` estiver entre os permitidos.

- `validateUser(data: any): IUser`:
	- Primeiro usa `isUser` para validação estrutural.
	- Depois executa validações de conteúdo:
		- `username` deve ter mínimo 5 caracteres.
		- `email` deve casar com regex simples `/\S+@\S+\.\S+/`.
		- `bio` (opcional) não pode exceder 200 caracteres.
	- Retorna o `data` tipado como `IUser` quando válido, ou lança `Error` com mensagem descritiva quando inválido.

Helpers internos:

- `isValidEmail(email: string): boolean` — checa formato básico de e-mail.
- `isValidRole(role: any): role is UserRole` — garante que `role` está entre `['admin','editor','viewer']`.

**Tipos Principais**

- `UserRole` (`'admin' | 'editor' | 'viewer'`)
- `IUser`:
	- `id: string` (readonly)
	- `username: string`
	- `email: string`
	- `role: UserRole`
	- `bio?: string`
- `IBaseConfig` / `IAdvancedConfig` (exemplos de tipos de configuração em `src/types/config.type.ts`).
- `UserAuditlog` (em `src/types/audit.type.ts`) combina `IUser` com detalhes de log.


**Scripts úteis**

- `npm start`: executa `src/index.ts` via `ts-node` e `--loader ts-node/esm`.
- `npm run build`: compila TypeScript para JavaScript usando `tsc`.

**Contribuição**

- Abra uma issue para discutir mudanças maiores.
- Envie PRs pequenas e focadas com descrições claras do problema/solução.

**LUIZ FERNANDO SILVA DIVINO**

