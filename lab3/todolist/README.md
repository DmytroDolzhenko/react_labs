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
