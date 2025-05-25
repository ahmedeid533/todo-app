var TodoApp = /** @class */ (function () {
    function TodoApp(containerId) {
        this.list = null;
        this.container = document.createElement('div');
        this.container.id = containerId;
        document.body.appendChild(this.container);
        this.render();
    }
    TodoApp.prototype.generateTodo = function (todoText, index) {
        var _this = this;
        // Create a simple Todo App with CRUD operations using TypeScript
        // Todo List
        var todo = todoText.trim();
        var listItem = document.createElement('li');
        var todoText_ = document.createElement('span');
        todoText_.textContent = todo;
        listItem.appendChild(todoText_);
        // Done Button
        var doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('doneButton');
        doneButton.onclick = function () { return _this.done(index); };
        listItem.appendChild(doneButton);
        // Edit Button
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () { return _this.editTodo(index); };
        listItem.appendChild(editButton);
        // Delete Button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () { return _this.deleteTodo(index); };
        listItem.appendChild(deleteButton);
        return listItem;
    };
    TodoApp.prototype.render = function () {
        var _this = this;
        this.container.innerHTML = '';
        // Title
        var title = document.createElement('h1');
        title.textContent = 'Todo App';
        this.container.appendChild(title);
        // Input Field
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter a new todo';
        input.id = 'todoInput';
        this.container.appendChild(input);
        // Add Button
        var addButton = document.createElement('button');
        addButton.textContent = 'Add Todo';
        addButton.onclick = function () { return _this.addTodo(); };
        this.container.appendChild(addButton);
    };
    TodoApp.prototype.addTodo = function () {
        var _a;
        if (!this.list) {
            this.list = document.createElement('ul');
            this.list.id = 'todoList';
            this.container.appendChild(this.list);
        }
        var length = this.list ? this.list.children.length : 0;
        console.log("length ==> ", length);
        var input = document.getElementById('todoInput');
        var newTodo = this.generateTodo(input.value.trim(), length);
        if (newTodo) {
            (_a = this.list) === null || _a === void 0 ? void 0 : _a.appendChild(newTodo);
        }
    };
    TodoApp.prototype.editTodo = function (index) {
        var _a, _b;
        var editInput = document.createElement('input');
        var liEdit = (_a = this.list) === null || _a === void 0 ? void 0 : _a.children[index];
        editInput.classList.add('InputEdit');
        editInput.value = ((_b = liEdit.querySelector('span')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        editInput.focus();
        for (var i = 0; i < liEdit.children.length; i++) {
            var child = liEdit.children[i];
            child.style.display = 'none'; // Hide all buttons
        }
        liEdit.appendChild(editInput);
        console.log("liEdit ==> ", liEdit);
        editInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") { // Cancel the default action, if needed
                event.preventDefault();
                var newTodo = editInput.value.trim();
                if (newTodo !== null && newTodo.trim() !== '') {
                    liEdit.querySelector('span').textContent = newTodo.trim();
                }
                for (var i = 0; i < liEdit.children.length; i++) {
                    var child = liEdit.children[i];
                    child.style.display = 'block'; // show all buttons
                }
                liEdit.removeChild(editInput);
                // Remove the input field after editing
            }
        });
    };
    // not actual delete, just hide the list item
    // This is a simple way to "delete" an item without removing it from the DOM
    // So i dont break the index of the other items in the list
    TodoApp.prototype.deleteTodo = function (index) {
        var child = this.list.children[index];
        child.style.display = 'none'; // Hide the list item 
    };
    // Toggle the done state of the todo item
    TodoApp.prototype.done = function (index) {
        var list = document.getElementById('todoList');
        var listItem = list.children[index];
        listItem.querySelector('.doneButton').innerHTML = listItem.querySelector('.doneButton').innerHTML == 'Not done' ? 'Done' : 'Not done';
        console.log("listItem ==> ", listItem);
        listItem.classList.toggle('done');
    };
    return TodoApp;
}());
// Initialize the Todo App
new TodoApp('todoAppContainer');
