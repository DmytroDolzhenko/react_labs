Component Tree

App
└── TodoList
    ├── AddTodoForm
    └── TodoItem


Data Flow

TodoList (state: [todos])
    │
    ├── onAddTodo(newTask)   add new task to the state
    ├── onDeleteTodo(id)   delete task from state
    └── onToggleComplete(id)  change state task status
          │
          │ ↓ {onAddTodo}
          ├── AddTodoForm
          │     ↑ onAddTodo(text) calls the parent function to add the task
          │
          └── [Map: todo from todos]
                │
                └── TodoItem (props: {task}, {onDeleteTodo}, {onToggleComplete})
                      │
                      │ ↓ task.text, task.isCompleted
                      ├── [Checkbox]
                      │     ↑ onChange → onToggleComplete(task.id) informs parent abount change state
                      └── [Delete Button]
                            ↑ onClick → onDeleteTodo(task.id) informs parent about delete


1. Кастомний хук useTodos - Джерело стану
   Хук має стани: todos, isLoading та error
   Хук надає функції-мутатори (addTodo, deleteTodo, toggleTodo), які інкапсулюють логіку зміни втнутрішнього стану та взаємодії з API

2. Компонент TodoList
   TodoList використовує стани (todos, isLoading, error) для відображення індикаторів та основного списку
   Проходить по завданнях todos і передає кожен об'єкт як пропс дочірньому TodoItem
   Передає функції (addTodo, deleteTodo, toggleTodo) як callback до AddTodoForm та TodoItem

3. Дочірні компоненти
   AddTodoForm викликає пропс onAddTodo(text) коли користувач додає нове завдання
   TodoItem викликає пропс onToggle(id) або onDelete(id) коли користувач натискає на чекбокс або кнопку видалити
   TodoList отримує цей виклик і передає його далі до функції deleteTodo з хука
