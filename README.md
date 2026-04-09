# TaskMind

Aplicativo mobile de gerenciamento de tarefas construido com `React Native`, `Expo`, `TypeScript` e `React Navigation`.

O projeto foi organizado para separar melhor telas, componentes reutilizaveis e componentes ligados ao dominio de tarefas.

## Funcionalidades

- Criacao de tarefas com titulo, detalhes e prioridade
- Edicao de tarefas existentes
- Exclusao de tarefas
- Marcacao de tarefas concluidas
- Filtros de listagem: todas, a fazer e concluidas
- Tela de perfil com resumo visual do progresso

## Stack

- `Expo`
- `React Native`
- `TypeScript`
- `React Navigation`
- `@expo/vector-icons`

## Estrutura de pastas

```text
src/
  assets/
    icon.png
    pessoaandrew.jpg
  components/
    tasks/
      TaskItem.tsx
    ui/
      AppInput.tsx
      Menu.tsx
  screens/
    home/
      HomeScreen.tsx
    profile/
      ProfileScreen.tsx
    tasks/
      ListScreen.tsx
      NewTaskScreen.tsx
      TaskModal.tsx
```

## Organizacao atual

- `components/ui`: componentes genericos e reutilizaveis da interface
- `components/tasks`: componentes especificos das tarefas
- `screens/home`: tela inicial
- `screens/tasks`: fluxo principal de tarefas
- `screens/profile`: tela de perfil

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm start
```

3. Rode no ambiente desejado:

```bash
npm run android
npm run ios
npm run web
```

## Arquivos principais

- [App.tsx](/home/dev/Documentos/taskapp/task/task/App.tsx): configuracao de navegacao e estado principal das tarefas
- [src/screens/tasks/ListScreen.tsx](/home/dev/Documentos/taskapp/task/task/src/screens/tasks/ListScreen.tsx): listagem, filtros e acoes de editar/excluir
- [src/screens/tasks/NewTaskScreen.tsx](/home/dev/Documentos/taskapp/task/task/src/screens/tasks/NewTaskScreen.tsx): formulario de criacao e edicao
- [src/screens/profile/ProfileScreen.tsx](/home/dev/Documentos/taskapp/task/task/src/screens/profile/ProfileScreen.tsx): tela de perfil

## Observacoes

- O estado das tarefas esta centralizado em `App.tsx`
- O arquivo `TaskModal.tsx` permanece no projeto como componente auxiliar, mas hoje o fluxo principal usa a tela `NewTaskScreen`
