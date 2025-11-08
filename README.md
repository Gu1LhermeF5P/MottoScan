# MotoScan 🏍️💨



Aplicativo full-stack para mapeamento e gerenciamento inteligente de motos em pátios. O projeto consiste em:



* **Frontend Mobile:** Desenvolvido em React Native com Expo, focado em uma interface de usuário fluida e reativa.

* **Backend API:** Uma API RESTful robusta e segura construída com Java e Spring Boot.



O sistema permite o cadastro, visualização, edição, exclusão e monitoramento das motos conforme seu status (pronta, com falha mecânica ou com BO de roubo), com acesso controlado por um sistema de autenticação completo.



---



## 👥 Integrantes



-   **Nome:** Guilherme Francisco

    -   **RM:** 554678

-   **Nome:** Larissa de Freitas

    -   **RM:** 555136



---



## ✨ Funcionalidades Principais



-   **Autenticação Segura:** Sistema completo de registro e login de usuários com tokens JWT.

-   **CRUD de Motos:** Funcionalidades para Criar, Ler, Editar e Deletar motos da frota, com acesso protegido por autenticação.

-   **Pátio Visual Dinâmico:** Uma tela que exibe um resumo visual da frota em tempo real, separada por status (Disponível, Manutenção, Com B.O.).

-   **Tema Dinâmico:** Interface totalmente adaptável aos modos Claro e Escuro do dispositivo, com um botão para troca manual.

-   **Navegação Intuitiva:** Fluxo de telas organizado com React Navigation.



---



## 🛠️ Tecnologias Utilizadas



#### **Backend (API)**

-   Java 17

-   Spring Boot

-   Spring Security (para autenticação com JWT)

-   Spring Data JPA

-   Flyway (para versionamento do banco)

-   H2 Database (banco de dados em memória/arquivo)

-   Maven



#### **Frontend (Mobile)**

-   React Native

-   Expo

-   TypeScript

-   React Navigation

-   Context API (para gerenciamento de estado de Autenticação e Tema)

-   AsyncStorage (para persistir o token e a preferência de tema)



---



## 📲 Como Rodar o Projeto Localmente



O projeto é dividido em duas partes: **backend** e **frontend**. Ambas precisam estar rodando simultaneamente.



### **1. Backend (API Java)**



**Pré-requisitos:**

-   Java (JDK 17 ou superior) instalado

-   Maven instalado



**Passos:**

1.  Navegue até a pasta da API:

    ```bash

    cd pasta-da-sua-api # Ex: cd api

    ```

2.  Execute a aplicação com o Maven Wrapper:

    ```bash

    ./mvnw spring-boot:run

    ```

    A API estará rodando em `http://localhost:8080`.



### **2. Frontend (App Mobile)**



**Pré-requisitos:**

-   Node.js e npm instalados

-   Emulador Android/iOS ou o aplicativo Expo Go no celular



**Passos:**

1.  Navegue até a pasta do aplicativo mobile:

    ```bash

    cd pasta-do-seu-app-mobile # Ex: cd motoscanmobile

    ```

2.  Instale as dependências:

    ```bash

    npm install

    ```

3.  **⚠️ IMPORTANTE:** Configure o IP da API.

    * Abra o arquivo `services/api.ts`.

    * Altere a variável `API_URL` para o endereço de IP da sua máquina na rede local (ex: `http://192.168.1.10:8080`).



4.  Inicie o projeto com Expo:

    ```bash

    npx expo start

    ```

5.  Escaneie o QR Code no terminal com o aplicativo **Expo Go** no celular ou execute em um emulador.



---



## 📁 Estrutura de Pastas (Frontend)

/

├── assets/         # Imagens e recursos estáticos

├── constants/      # Constantes globais (ex: Cores do tema)

├── context/        # Contextos da aplicação (AuthContext, ThemeContext)

├── screens/        # Telas principais da aplicação

├── services/       # Lógica de comunicação com a API

└── types/          # Definições de tipos TypeScript

---



## 📱 Telas Desenvolvidas

-   **Fluxo de Autenticação:**

    -   Tela de Login

    -   Tela de Cadastro de Usuário

-   **Fluxo Principal:**

    -   Tela Home (com botões de navegação e toggle de tema)

    -   Tela de Listagem de Motos (com opções de editar e excluir)

    -   Tela de Cadastro de Motos

    -   Tela de Edição de Motos

    -   Tela de Pátio Inteligente com zonas de status

## Link API 

link[[api_java](https://github.com/Gu1LhermeF5P/api_java)]

## 🎥 Vídeo de Demonstração



Assista a uma demonstração completa da aplicação, apresentando as principais funcionalidades, fluxos de usuário e a tecnologia por trás do projeto.



**[[➡️[ Link para o Vídeo de Demonstração](https://youtu.be/5iowC64x4SE) (Clique Aqui)]**



---
