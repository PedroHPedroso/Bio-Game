# Bio-Game 🐛🔍

![GitHub last commit](https://img.shields.io/github/last-commit/PedroHPedroso/Bio-Game)
![GitHub repo size](https://img.shields.io/github/repo-size/PedroHPedroso/Bio-Game)
![GitHub language count](https://img.shields.io/github/languages/count/PedroHPedroso/Bio-Game)
![GitHub top language](https://img.shields.io/github/languages/top/PedroHPedroso/Bio-Game)

## 🎯 Descrição

**Bio-Game** é um jogo educativo desenvolvido em **Electron** para desktop.  
O jogador deve localizar insetos e animais em imagens interativas, registrando seu desempenho.  
O jogo coleta os seguintes dados do jogador:

- Nome
- Idade
- Escola (com sugestões)
- Etapa Escolar (Ensino Infantil, Fundamental, Médio ou Especial)
- Pontuação final
- Tentativas
- Acertos
- Erros
- Tempo total
- Data e hora do registro

Os registros são salvos em um arquivo **CSV** local para análise.

---

## 🖥️ Tecnologias Utilizadas

- **Electron** – Aplicativo desktop
- **JavaScript** – Lógica do jogo
- **HTML5 & CSS3** – Interface
- **JSON** – Lista de escolas sugeridas
- **CSV** – Armazenamento de registros locais

---

## 📸 Screenshot da tela de registro do jogo

<img width="391" height="623" alt="image" src="https://github.com/user-attachments/assets/95971be5-4ca7-4f3c-8380-4ddc07bcd199" />

## 📸 Screenshot da tela do jogo

<img width="1897" height="967" alt="image" src="https://github.com/user-attachments/assets/1566c1f8-c8d2-4eab-954d-b444a8c85037" />

## 📸 Screenshot de Uso da Dica durante o jogo

<img width="1462" height="918" alt="image" src="https://github.com/user-attachments/assets/4fcbfaa6-130f-4d78-8abc-8c2dea0d4620" />

## 📸 Screenshot da Tela de finalização

<img width="517" height="424" alt="image" src="https://github.com/user-attachments/assets/7be5d58a-f05e-4329-a727-1f34a9b07b6f" />

## 📸 Botão "Saiba Mais"

<img width="1456" height="915" alt="image" src="https://github.com/user-attachments/assets/ad142a65-9dbc-40c0-a129-07ddac6c0214" />

## 📸 Screenshots do ranking do jogo
### Sem registro
<img width="1462" height="579" alt="image" src="https://github.com/user-attachments/assets/28078cce-16b0-4a26-a95f-5647072ddb9f" />

### Exemplo de registro
<img width="1468" height="546" alt="image" src="https://github.com/user-attachments/assets/7133ca4c-b2b8-4e44-9aab-cdb89e221eb8" />

---

## 🧩 Funcionalidades

- Cadastro de jogador com validação
- Campo de escola com sugestões via `DicSchool.json`
- Campo de etapa escolar
- Jogo com imagem interativa e alvos clicáveis
- Sistema de pontuação baseado no tempo e acertos
- Dicas visuais
- Tela de "Game Over" com estatísticas detalhadas
- Reinício do jogo para novo jogador sem fechar a aplicação
- Registro local em CSV

---

## 📂 Estrutura do Projeto

```text
Bio-Game/
├── DicSchool.json   # Lista de escolas para sugestões
├── Fotos/           # Imagens utilizadas no jogo
├── index.html       # Estrutura principal do jogo
├── main.js          # Inicialização do Electron
├── package.json     # Configurações do projeto Node/Electron
├── script.js        # Lógica do jogo
├── style.css        # Estilo do jogo
├── cadastros.csv    # Arquivo local onde os registros são salvos
└── README.md        # Este arquivo
```

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/PedroHPedroso/Bio-Game.git
cd Bio-Game
```

2. Instale as Pendências
```bash
npm install
```

3. Execute o aplicativo
```bash
npm start
```

O aplicativo abrirá como executável local usando Electron.


---

## 📝 Como Jogar

1. Preencha o cadastro (**Nome, Idade, Escola e Etapa Escolar**).
2. Clique em **Registrar**.
3. Clique em **Iniciar Jogo**.
4. Encontre os **animais/insetos** na imagem.
5. Ao finalizar, será exibida a tela de **Game Over** com pontuação e estatísticas.
6. O formulário reaparece automaticamente para registrar o próximo jogador.

💡 Use a opção **Dica** se necessário.

---

## 💾 Armazenamento

- Todos os registros são armazenados em `cadastros.csv` no mesmo diretório do aplicativo.  
- O CSV inclui: **Nome, Idade, Escola, Etapa Escolar, Pontuação e Data/Hora**.  
- Pode ser aberto no **Excel** ou **Google Sheets** para análise.  

---

## 🔧 Personalizações

- ➕ Adicionar novas imagens ou alvos: **editar `script.js` na seção `allTargets`**.  
- 🏫 Atualizar a lista de escolas: **alterar `DicSchool.json`**.  
- 🎨 Alterar estilos visuais: **editar `style.css`**.  

---

## 🧑‍🏫 Público-alvo

- Alunos do **Ensino Infantil, Fundamental, Médio** e **Educação Especial**.  
- Professores e educadores que desejam utilizar a plataforma como recurso pedagógico.  

---

## 📝 Observações

- O projeto é executável **localmente via Electron**.  
- Nenhuma conexão com a internet é necessária após a instalação.  
- Cada sessão de jogo permite registrar novos jogadores **sem reiniciar a aplicação**.  
