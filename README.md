# Grupo 02 — Teste de Interface por Robô

Uma demonstração prática de automação de testes de interface com **Selenium WebDriver**. O projeto abre uma página local, preenche um formulário de cadastro como uma pessoa faria, envia os dados e verifica se a confirmação aparece.

> **Objetivo da apresentação:** mostrar como um teste automatizado interage com uma interface real do navegador e como ele detecta se o resultado esperado aconteceu.

## O que o robô vai fazer

1. Abrir a página de cadastro no navegador.
2. Encontrar os campos pelo atributo `id`.
3. Digitar nome, e-mail e senha.
4. Clicar em **Criar cadastro**.
5. Esperar a mensagem de confirmação aparecer.
6. Comparar a mensagem exibida com o resultado esperado.

Se uma etapa falhar, o teste termina com erro, registra a falha no terminal e tenta salvar uma captura de tela em `artifacts/`.

## Estrutura do projeto

```text
.
├── public/
│   ├── app.js                 # Validação e confirmação do formulário
│   ├── index.html             # Página de cadastro
│   └── styles.css             # Estilos da demonstração
├── test/
│   └── cadastro.test.js       # Teste automatizado com Selenium
├── .devcontainer/             # Ambiente pronto para GitHub Codespaces
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                  # Servidor local para abrir a página no navegador
```

## Requisitos

- Node.js 18 ou superior e npm.
- Google Chrome instalado ou acesso para o Selenium Manager baixá-lo.
- Acesso à internet na primeira execução, caso seja necessário baixar o navegador ou o driver compatível.

O teste usa o Chrome em modo headless por padrão. Para acompanhar o navegador durante a demonstração, defina `HEADLESS=false`. Em Linux, o Chrome também depende das bibliotecas de sistema exigidas pelo navegador; o Selenium Manager não instala essas bibliotecas.

## Como executar

### No GitHub Codespaces

1. No GitHub, abra o repositório e selecione **Code → Codespaces → Create codespace on main**.
2. Na primeira criação, aguarde a configuração terminar. O ambiente instala Node.js, Chromium, ChromeDriver e as dependências do projeto.
3. No terminal do Codespace, execute:

   ```bash
   npm start
   ```

4. O Codespaces encaminhará a porta 3000 e abrirá a página. Se não abrir automaticamente, use a aba **Ports** e clique no endereço da porta 3000.
5. Deixe o servidor rodando. Abra outro terminal e execute:

   ```bash
   npm test
   ```

No Codespaces o teste roda em modo headless: a janela do Chrome não aparece na tela, mas a página pode ser mostrada no navegador pelo encaminhamento da porta. Para a apresentação, mostre a página e o resultado do teste no terminal. A preparação inicial instala o navegador e pode levar alguns minutos; faça essa primeira criação antes da aula.

### 1. Instale as dependências

Na pasta do projeto:

```bash
npm install
```

### 2. Inicie o formulário

```bash
npm start
```

O servidor ficará disponível em <http://localhost:3000>. Deixe esse terminal aberto.

### 3. Execute o teste

Em outro terminal, na mesma pasta:

```bash
npm test
```

Para ver o robô interagindo com o navegador:

```bash
HEADLESS=false npm test
```

Esse modo visível é para um computador com ambiente gráfico. No terminal Linux do Codespaces, mantenha o modo headless padrão. No PowerShell local:

```powershell
$env:HEADLESS="false"
npm test
```

Quando o cenário passar, o terminal exibirá `✅ Teste aprovado: cadastro confirmado com sucesso.`. Em caso de falha, o processo termina com código diferente de zero; se o navegador permitir, a captura de tela ficará em `artifacts/`.

## Como o teste funciona

O arquivo `test/cadastro.test.js` usa os localizadores `By.id(...)` para encontrar os elementos e `until.elementIsVisible(...)` para aguardar a confirmação. Essa espera explícita é importante: páginas podem levar um tempo variável para atualizar, e pausas fixas (`sleep`) deixam os testes lentos e instáveis.

O teste verifica o texto exato da confirmação. Assim, não basta o robô clicar no botão: ele também comprova que a interface apresentou o resultado esperado.

O formulário é uma demonstração local. Ele valida os campos no navegador e mostra a confirmação, mas **não envia dados para um servidor nem cria uma conta real**. Use dados fictícios durante a apresentação.

## Conceitos para explicar

### O que é um teste automatizado de interface?

É um programa que controla um navegador para reproduzir ações de uma pessoa e verificar o comportamento visível de um sistema. O navegador continua carregando a página e executando JavaScript; o teste apenas automatiza a interação e as verificações.

### Como o robô simula uma pessoa?

O Selenium WebDriver envia comandos ao navegador, como abrir uma URL, localizar um campo, digitar texto, clicar e ler o conteúdo exibido. Neste projeto, o caminho é:

```text
Teste → Selenium WebDriver → Chrome → Página de cadastro
```

### Testes manuais e automatizados

| Teste manual | Teste automatizado |
|---|---|
| Uma pessoa executa cada passo. | O script repete os passos no navegador. |
| É flexível para explorar e avaliar a experiência. | É consistente e pode ser repetido muitas vezes. |
| Pode levar mais tempo quando repetido com frequência. | Exige implementação e manutenção inicial. |
| É útil para investigação e avaliação visual. | É útil para regressão e verificações frequentes. |

Automação não elimina testes manuais: as abordagens se complementam.

## Ferramentas de automação

- **Selenium WebDriver:** ferramenta usada nesta demonstração; oferece suporte a vários navegadores e linguagens.
- **Playwright:** alternativa moderna com suporte a Chromium, Firefox e WebKit, além de recursos próprios para esperas e execução paralela.
- **Outras opções:** Cypress e WebdriverIO também automatizam fluxos de interface, cada qual com seus recursos e limitações.

Para automatizar um navegador, normalmente são necessários o código do teste, a biblioteca de automação, um navegador compatível e um driver ou mecanismo de gerenciamento compatível. O Selenium Manager pode localizar ou baixar o navegador e o driver, mas não instala bibliotecas de sistema que o navegador exija.

## Vantagens e limitações

**Vantagens**

- Repetibilidade: o mesmo roteiro pode ser executado novamente.
- Produtividade: reduz o trabalho repetitivo de regressão.
- Feedback: falhas podem ser identificadas logo após uma mudança.
- Consistência: os passos e as verificações seguem o mesmo roteiro.

**Desafios**

- Mudanças na estrutura ou nos seletores podem exigir atualização dos testes.
- Esperas mal planejadas podem causar instabilidade.
- Um teste automatizado precisa ser revisado e mantido junto com o produto.
- Nem toda avaliação é simples de automatizar, especialmente aspectos subjetivos da experiência.

## Roteiro sugerido — 15 minutos

| Tempo | Parte | O que apresentar |
|---|---|---|
| 1 min | Introdução | O que são testes de interface e o objetivo da demonstração. |
| 3 min | Conceitos | Simulação de ações, verificações e diferenças entre teste manual e automático. |
| 3 min | Ferramentas | Selenium, Playwright e requisitos para controlar um navegador. |
| 3 min | Criação e execução | Localizadores, preenchimento, clique, espera e validação da mensagem. |
| 3 min | Vantagens, limitações e demonstração | Repetibilidade, manutenção e execução do fluxo de cadastro. |
| 2 min | Conclusão | Recapitular quando a automação ajuda e como ela complementa o teste manual. |

### Sugestão para a demonstração ao vivo

1. Mostre o formulário em <http://localhost:3000>.
2. Explique os `id`s dos campos e o seletor usado pelo teste.
3. No Codespaces, execute `npm test` e mostre o resultado no terminal. Em um computador local com ambiente gráfico, use `HEADLESS=false npm test` (ou a sintaxe do PowerShell).
4. Aponte o preenchimento automático e a mensagem de confirmação.
5. Mostre no código a espera explícita e a asserção do texto esperado.

**Conclusão:** testes de interface automatizados são especialmente úteis para repetir fluxos importantes e detectar regressões, desde que os seletores, as esperas e a manutenção sejam tratados com cuidado.
