# Ficha de RPG - PC (PWA)

Este projeto é uma **Ficha de Personagem de RPG** para um sistema proprio  criado pelo meu amigo Arthur Lobato, interativa, desenvolvida como uma Progressive Web App (PWA). Ela funciona como uma ferramenta digital completa para jogadores gerenciarem seus personagens durante sessões de RPG, com foco em usabilidade, automação e estética.

## 📋 Natureza e Propósito

A aplicação foi criada para substituir ou complementar as fichas de papel tradicionais. Sendo uma **PWA**, ela pode ser acessada via navegador ou instalada como um aplicativo nativo em desktops e dispositivos móveis (Android/iOS), permitindo uso offline e acesso rápido.

O objetivo principal é agilizar a matemática e a gestão de recursos do jogo, permitindo que o jogador foque na narrativa e na interpretação.

## ✨ Principais Funcionalidades

*   **Temas Visuais**: Suporte a múltiplos temas (Atualmente **Cyberpunk** e **Medieval/Pergaminho**), adaptando-se à ambientação da sua campanha.
*   **Automação de Regras**: Cálculos automáticos de bônus, custos de habilidades e rolagens de dados.
*   **Gestão de Recursos**: Controle fácil de **Vitalidade**, **Focus** e **Vontade**, com validação de custos para ações.
*   **Sistema de Combate**: Área dedicada para Defesa, Resistências e Condições Ativas.
*   **Inventário e Notas**: Gerenciamento de itens, biografia e anotações gerais.
*   **Persistência Local**: Todos os dados são salvos automaticamente no navegador do usuário (LocalStorage), garantindo que nada seja perdido ao fechar a aba.

## 🛠️ Tecnologias

O projeto é construído com tecnologias web modernas visando performance e facilidade de manutenção:

*   **[React](https://react.dev/)**: Biblioteca principal para construção da interface.
*   **[Vite](https://vitejs.dev/)**: Build tool rápida e leve.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de estilização para um design responsivo e customizável.
*   **Context API**: Para gerenciamento global do estado do personagem.
*   **Vite PWA Plugin**: Para capacidades de instalação e cache offline.

## 🚀 Como Executar Localmente

Para rodar o projeto em sua máquina para desenvolvimento ou testes:

1.  **Pré-requisitos**: Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2.  **Instalação**:
    Na pasta raiz do projeto, execute:
    ```bash
    npm install
    ```
3.  **Execução**:
    Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    Acesse a URL indicada no terminal (geralmente `http://localhost:5173`).

## 📦 Build e Deploy

Para gerar a versão de produção (otimizada):

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

## ℹ️ Informações Importantes

*   **Edição**: A ficha possui um "Modo de Edição" (ícone de lápis) que deve ser ativado para modificar atributos base e informações estruturais do personagem. Durante o jogo, o modo de edição geralmente fica desligado para evitar alterações acidentais.
*   **Dados**: Como os dados ficam no LocalStorage, limpar o cache do navegador pode apagar sua ficha. Exporte seus dados (se a funcionalidade estiver disponível) ou evite limpar dados de site para este domínio.
