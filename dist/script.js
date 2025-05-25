"use strict";
'use es6';
class TodoApp {
    constructor(containerId) {
        this.list = null;
        this.container = document.createElement('div');
        this.container.id = containerId;
        document.body.appendChild(this.container);
        this.render();
    }
    generateTodo(todoText, index) {
        // Create a simple Todo App with CRUD operations using TypeScript
        // Todo List
        const todo = todoText.trim();
        const listItem = document.createElement('li');
        const todoText_ = document.createElement('span');
        todoText_.textContent = todo;
        listItem.appendChild(todoText_);
        // Done Button
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('doneButton');
        doneButton.onclick = () => this.done(index);
        listItem.appendChild(doneButton);
        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => this.editTodo(index);
        listItem.appendChild(editButton);
        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => console.log("hi");
        ;
        listItem.appendChild(deleteButton);
        return listItem;
    }
    render() {
        this.container.innerHTML = '';
        // Title
        const title = document.createElement('h1');
        title.textContent = 'Todo App';
        this.container.appendChild(title);
        // Input Field
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter a new todo';
        input.id = 'todoInput';
        this.container.appendChild(input);
        // Add Button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Todo';
        addButton.onclick = () => this.addTodo();
        this.container.appendChild(addButton);
    }
    addTodo() {
        var _a;
        if (!this.list) {
            this.list = document.createElement('ul');
            this.list.id = 'todoList';
            this.container.appendChild(this.list);
        }
        const length = this.list ? this.list.children.length : 0;
        console.log("length ==> ", length);
        const input = document.getElementById('todoInput');
        const newTodo = this.generateTodo(input.value.trim(), length);
        if (newTodo) {
            (_a = this.list) === null || _a === void 0 ? void 0 : _a.appendChild(newTodo);
        }
    }
    editTodo(index) {
        var _a, _b;
        const editInput = document.createElement('input');
        const liEdit = (_a = this.list) === null || _a === void 0 ? void 0 : _a.children[index];
        editInput.classList.add('InputEdit');
        editInput.value = ((_b = liEdit.querySelector('span')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        editInput.focus();
        liEdit.appendChild(editInput);
        console.log("liEdit ==> ", liEdit);
        editInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") { // Cancel the default action, if needed
                event.preventDefault();
                const newTodo = editInput.value.trim();
                if (newTodo !== null && newTodo.trim() !== '') {
                    liEdit.querySelector('span').textContent = newTodo.trim();
                }
                liEdit.removeChild(editInput);
                // Remove the input field after editing
            }
        });
    }
    // private deleteTodo(index : number): void {
    // this.todos.splice(index, 1);
    // this.render();
    // }
    done(index) {
        const list = document.getElementById('todoList');
        const listItem = list.children[index];
        listItem.querySelector('.doneButton').innerHTML = listItem.querySelector('.doneButton').innerHTML == 'Not done' ? 'Done' : 'Not done';
        console.log("listItem ==> ", listItem);
        listItem.classList.toggle('done');
    }
}
// Initialize the Todo App
new TodoApp('todoAppContainer');
