# MotoScan 🏍️💨

Aplicativo full-stack para mapeamento e gerenciamento inteligente de motos em pátios. O projeto consiste em um **frontend mobile** em React Native com Expo e uma **API RESTful robusta** construída com Java e Spring Boot.

O sistema permite o cadastro, visualização, edição, exclusão e monitoramento das motos conforme seu status (pronta, com falha mecânica ou com BO de roubo), com acesso controlado por um sistema de autenticação completo.

## 👥 Integrantes

- **Nome:** Guilherme Francisco
  - **RM:** 554678
- **Nome:** Larissa de Freitas
  - **RM:** 555136

---

## ✨ Funcionalidades Principais

- **Autenticação Segura:** Sistema completo de registro e login de usuários com tokens JWT (JSON Web Tokens) para proteger todas as rotas da API.
- **CRUD de Motos:** Funcionalidades para Criar, Ler, Editar e Deletar motos da frota, com acesso protegido por autenticação.
- **Pátio Visual Dinâmico:** Uma tela que exibe um resumo visual da frota em tempo real, separada por status (Disponível, Manutenção, Com B.O.).
- **Tema Dinâmico:** Interface totalmente adaptável aos modos Claro e Escuro do dispositivo, com um botão para troca manual e persistência da preferência.
- **Navegação Intuitiva:** Fluxo de telas organizado utilizando o React Navigation.

---

## 🛠️ Tecnologias Utilizadas

| Componente | Tecnologia | Detalhes Principais |
| :--- | :--- | :--- |
| **Backend (API)** | **Java 17 & Spring Boot** | Spring Security (JWT), Spring Data JPA, Flyway e H2 Database. |
| **Frontend (Mobile)** | **React Native & Expo** | TypeScript, React Navigation, Context API (Estado e Tema) e AsyncStorage. |

---

## 📲 Como Rodar o Projeto Localmente

O projeto é dividido em duas partes: **backend** (API) e **frontend** (App Mobile). Ambas precisam estar rodando simultaneamente.

### **1. Backend (API Java)**

**Pré-requisitos:**
- Java (JDK 17 ou superior) instalado
- Maven instalado

**Passos:**
1. Navegue até a pasta da API (confira o [Link da API](#link-da-api)):
   ```bash
   cd pasta-da-sua-api # Ex: cd api
