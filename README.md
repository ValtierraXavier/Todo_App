# Todo App
Simple todo app using vite react.js work in progress. Very rough currently.

## Installation
```bash
    git clone https://github.com/ValtierraXavier/Todo_App.git
    npm install
    npm run dev
```
Then navigate to http://localhost:5173 in your browser of choice

## Actions
Full CRUD Support (within React state)
- Create
- Read
- Update
- Delete

### Create a todo item
Fill in the text fields and click the "Add Todo" button to add a todo.
It will appear on the screen beneath the form.

### Edit a todo item
Within the todo item is an "Edit" button. When clicked, it will populate the text fields with the todo's information. 
Edit the text and click the "Save Edit" button. The changes will be reflected immediately. 
the "Edit" button will be disabled during the editing process. 

### Delete a todo item
Similarly, clicking the "Delete" button will delete that specific todo item.

### Completion
Items can be "completed". When the "Complete" button is clicked, the "Incomplete" text within the item will change to "Completed: {today}" 
The "Complete" and "Edit" buttons will be disabled at this time. 

### Technology
Node.js, vite, ReactJS,

### In Progress
- Local Storage
- Undo delete
- Date input support
- Input validation(character count, duplication, type)
- Create todo button
- Create todo form (modal)
- Database Storage/API
- Date-Time Support
- Auth & Users