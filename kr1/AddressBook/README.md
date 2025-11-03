```

├── ContactForm (Presentational)
|    │    ↓ {addContact}
|    └── Форма введення
|        ↑ onSubmit → addContact(data)
|
├── SearchBar (Presentational)
|    │    ↓ {searchTerm}, {setSearchTerm}
|    └── Поле пошуку
|        ↑ onChange → setSearchTerm(text)
|
|
└── ContactTable (Container/Presenter)
        │    ↓ {contacts} (відфільтрований список), {onEditContact}
        │
        └──
            │
            └── TableRow (Presentational)
                │    ↓ {contact}, {onEditContact}
                ├── [Text/Edit Input] (Внутрішній стан isEditing)
                │    ↑ onChange → Оновлює локальні дані
                └── [Buttons: Редагувати, Зберегти]
                      ↑ onClick (Редагувати) → setIsEditing(true)
                      ↑ onClick (Зберегти) → onEditContact(id, updatedData)
```
