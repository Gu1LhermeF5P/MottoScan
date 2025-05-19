
# MotoScan 🚨📍

Aplicativo mobile em React Native com Expo para mapeamento inteligente de motos em pátios de diferentes filiais. Permite o cadastro, visualização, filtro e monitoramento das motos conforme seu status (pronta, com falha mecânica ou com BO de roubo).

---

## 👥 Integrantes

- **Nome:** Guilherme Francisco   
  **RM:** 554678 
- **Nome:** Larissa de Freitas
  **RM:** 555136
- **Nome:** João Victor Rebello de Santis  
  **RM:** 555287


---

## 📲 Como rodar o projeto localmente

### Pré-requisitos:

- Node.js e npm instalados
- Expo CLI instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```
- Emulador Android/iOS ou aplicativo Expo Go no celular

### Passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/SeuUsuario/MotoScan.git
   cd MotoScan
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto com Expo:
   ```bash
   npx expo start
   ```

4. Escaneie o QR Code no terminal com o aplicativo **Expo Go** no celular ou execute em um emulador.

---

## ✅ Funcionalidades implementadas (Sprint 1)

### 1. Navegação entre telas (✔️ 20 pontos)

- Implementado com **React Navigation**
- Telas: Boas-vindas, Cadastro, Lista de Motos, Mapa Interativo (Pátio), Detalhes

### 2. Protótipo visual funcional (✔️ 30 pontos)

- Telas estilizadas com cores da marca Mottu (`#00C247`)
- Ícones interativos
- Grid dinâmico por zona no pátio
- Feedback visual para status das motos

### 3. Formulário com estado (✔️ 20 pontos)

- Tela de cadastro de motos
- Campos controlados com `useState`
- Informações atualizadas em tempo real na lista de motos

### 4. Armazenamento local com AsyncStorage (✔️ 20 pontos)

- Motos cadastradas são persistidas no dispositivo
- Dados restaurados automaticamente ao reiniciar o app

### 5. GitHub Classroom (✔️ 10 pontos)

- Repositório hospedado com organização de pastas e instruções no `README.md`

---

## 🧠 Solução Implementada

O MotoScan simula a operação de uma empresa que aluga motos e precisa monitorar seu status em tempo real. O sistema permite:

- Cadastro de motos com modelo, placa e status (roubada, falha mecânica, ou pronta)
- Visualização em lista e em formato de mapa dividido por zonas
- Filtros por tipo de problema
- Detalhamento individual de cada moto com modal interativo
- Uso de armazenamento local para simulação offline

O app foi desenvolvido com foco em usabilidade, fluidez e facilidade de testes, visando um MVP funcional para inspeção e logística em pátios de motos.

---

## 📁 Estrutura de pastas

```
/screens
  ├── WelcomeScreen.tsx
  ├── CadastroScreen.tsx
  ├── MotoListScreen.tsx
  ├── PatioScreen.tsx
  └── DetalhesScreen.tsx

/types
  └── Moto.ts

/assets
  └── motos (imagens dos modelos)

App.tsx
```

---

## 📦 Tecnologias Utilizadas

- React Native com Expo
- React Navigation
- AsyncStorage
- TypeScript
- Icons (MaterialCommunityIcons)

---

## 🚀 Versão futura (Sprint 2)

- Integração com mapa real via `react-native-maps`
- Simulação de sensores de movimentação
- Notificações em tempo real
- Controle por filiais múltiplas

---
