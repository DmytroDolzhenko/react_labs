```
Component Tree + Data Flow

App
│
└── TodoList  (state: todos, search, currentPage, totalPages, totalTodos, isLoading, error)
     │
     ├── TodoSearch
     │     props: search
     │     ↑ onSearchChange(value)   (child → parent: update search)
     │
     ├── AddTodoForm
     │     ↑ onAddTodo(text)         (child → parent: send new task)
     │
     ├── TodoItem (state: isEditing, editText)
     │     props: task, onToggle, onDelete, onEdit
     │
     │     ├── [Checkbox] toggle → ↑ onToggle(id)       (child → parent: toggle completed)
     │     ├── [Edit Button] → local state (isEditing = true)
     │     ├── [Save Button] ↑ onEdit(id, text) (child → parent: edit task)
     │     └── [Delete Button] ↑ onDelete(id)           (child → parent: request removal)
     │
     └── TodoPagination
           props: currentPage, totalPages, totalTodos
           ├── [Prev Button] ↑ goToPrevPage()   (child → parent: change page)
           └── [Next Button] ↑ goToNextPage()   (child → parent: change page)

---

1. App

Кореневий компонент застосунку.

Відповідає лише за рендеринг головного компонента TodoList.

2. TodoList

Головний контейнер, який керує станом додатку.

Використовує кастомний хук useTodos
для роботи з даними та логікою.

Передає дані та функції дочірнім компонентам через props.

Основні функції:

addTodo(text) — додає нове завдання

toggleTodo(id) — змінює статус виконання

deleteTodo(id) — видаляє завдання

editTodo(id, newTitle) — редагує назву завдання

setSearch(value) — змінює текст пошуку

goToNextPage(), goToPrevPage() — перемикають сторінки

3. TodoSearch

Компонент поля пошуку.

Отримує через props:

search — поточний текст пошуку;

onSearchChange(value) — функцію для зміни стану пошуку.

Коли користувач вводить текст, викликається onSearchChange, що оновлює стан у TodoList.

Data Flow:
Input ➝ TodoSearch ➝ onSearchChange(value) ➝ TodoList ➝ setSearch(value)

4. AddTodoForm

Відповідає за додавання нового завдання.

Має локальний стан text для контролю інпуту.

Після натискання кнопки "Додати" викликає onAddTodo(text), передаючи значення у TodoList.

Data Flow:
Input ➝ AddTodoForm ➝ onAddTodo(text) ➝ TodoList ➝ addTodo(text)

5. TodoItem

Відображає окреме завдання.

Має локальні стани:

isEditing — чи активне редагування;

editText — текст при редагуванні.

Отримує через props:
task, onToggle, onDelete, onEdit.

Data Flow:
User Action ➝ TodoItem ➝ onToggle/onEdit/onDelete ➝ TodoList ➝ useTodos

6. TodoPagination

Відповідає за навігацію між сторінками списку.

Отримує через props:

currentPage, totalPages, totalTodos;

goToPrevPage(), goToNextPage() — функції перемикання сторінок.

Кнопки "Попередня" та "Наступна" викликають відповідні функції у TodoList.

---

Data Flow:
Button Click ➝ TodoPagination ➝ goToPrevPage/goToNextPage ➝ TodoList ➝ useTodos ➝ fetchTodos()

Загальна логіка потоку даних

useTodos керує станом (todos, search, pagination).

TodoList передає ці дані в дочірні компоненти через props.

Дочірні компоненти реагують на дії користувача і передають дані вгору через callback-функції.

TodoList оновлює стан через useTodos, що викликає ре-рендер усіх компонентів із новими даними.
```
