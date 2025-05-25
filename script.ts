class TodoApp {
	private container : HTMLElement;
	private list : HTMLUListElement | null = null;

	constructor(containerId : string) {
		this.container = document.createElement('div');
		this.container.id = containerId;
		document.body.appendChild(this.container);
		this.render();
	}

	private generateTodo(todoText : string, index : number): HTMLLIElement | null {
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
		deleteButton.onclick = () => this.deleteTodo(index);
		listItem.appendChild(deleteButton);

		return listItem;
	}


	private render(): void {
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

	private addTodo(): void {
		if (!this.list) {
			this.list = document.createElement('ul');
			this.list.id = 'todoList';
			this.container.appendChild(this.list);
		}
		const length = this.list ? this.list.children.length : 0;
		console.log("length ==> ", length);
		const input = document.getElementById('todoInput')as HTMLInputElement;
		const newTodo = this.generateTodo(input.value.trim(), length);
		if (newTodo) {
			this.list ?. appendChild(newTodo)
		}
	}

	private editTodo(index : number): void {
		const editInput = document.createElement('input')as HTMLInputElement;
		const liEdit = this.list ?. children[index] as HTMLLIElement;
		editInput.classList.add('InputEdit');
		editInput.value = liEdit.querySelector('span') ?. textContent || '';
		editInput.focus();
		for (let i = 0; i < liEdit.children.length; i++) {
			const child = liEdit.children[i] as HTMLButtonElement;
			child.style.display = 'none'; // Hide all buttons
		}liEdit.appendChild(editInput);
		console.log("liEdit ==> ", liEdit);
		editInput.addEventListener("keypress", (event) => { // If the user presses the "Enter" key on the keyboard
			if (event.key === "Enter") { // Cancel the default action, if needed
				event.preventDefault();
				const newTodo = editInput.value.trim();
				if (newTodo !== null && newTodo.trim() !== '') {
					liEdit.querySelector('span')!.textContent = newTodo.trim();
				}
				for (let i = 0; i < liEdit.children.length; i++) {
					const child = liEdit.children[i] as HTMLButtonElement;
					child.style.display = 'block'; // show all buttons
				}liEdit.removeChild(editInput);
				// Remove the input field after editing
			}
		});
	}

	// not actual delete, just hide the list item
	// This is a simple way to "delete" an item without removing it from the DOM
	// So i dont break the index of the other items in the list
	private deleteTodo(index : number): void {
		const child = this.list !.children[index]!as HTMLLIElement;
		child.style.display = 'none'; // Hide the list item
	}

	// Toggle the done state of the todo item
	private done(index : number): void {
		const list = document.getElementById('todoList')as HTMLUListElement;
		const listItem = list.children[index] as HTMLLIElement;
		listItem.querySelector('.doneButton')!.innerHTML = listItem.querySelector('.doneButton')!.innerHTML == 'Not done' ? 'Done' : 'Not done';
		console.log("listItem ==> ", listItem);
		listItem.classList.toggle('done');
	}
}

// Initialize the Todo App
new TodoApp('todoAppContainer');
