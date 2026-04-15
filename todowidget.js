(function () {

    class TodoWidget {

        constructor() {
            this.storageKey = "todo-widget-items";
            this.todos = [];

            this.createContainer();
            this.loadFromStorage();
            this.render();
            this.attachEvents();
        }

        // -------------------------
        // Create Main Container
        // -------------------------
        createContainer() {
            this.container = document.createElement("div");
            this.container.id = "todo-widget-container";
            document.body.appendChild(this.container);

            this.injectStyles();
        }

        // -------------------------
        // Inject Styles (Once)
        // -------------------------
        injectStyles() {
            if (document.getElementById("todo-widget-styles")) return;

            const style = document.createElement("style");
            style.id = "todo-widget-styles";
            style.textContent = `
                #todo-widget-container {
                    font-family: Arial, sans-serif;
                    max-width: 320px;
                    border: 1px solid #ccc;
                    padding: 15px;
                    border-radius: 8px;
                    background: #f9f9f9;
                }

                .tw-input {
                    width: 70%;
                    padding: 6px;
                }

                .tw-button {
                    padding: 6px 8px;
                    margin-left: 5px;
                }

                .tw-list {
                    margin-top: 15px;
                    padding-left: 20px;
                }

                .tw-list li {
                    margin-bottom: 6px;
                }

                .tw-clear {
                    margin-top: 10px;
                    background: #d9534f;
                    color: white;
                    border: none;
                    padding: 6px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
        }

        // -------------------------
        // Load From Local Storage
        // -------------------------
        loadFromStorage() {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                try {
                    this.todos = JSON.parse(saved);
                } catch (e) {
                    this.todos = [];
                }
            }
        }

        // -------------------------
        // Save To Local Storage
        // -------------------------
        saveToStorage() {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.todos)
            );
        }

        // -------------------------
        // Render UI
        // -------------------------
        render() {
            this.container.innerHTML = `
                <h3>Todo List</h3>
                <input type="text" class="tw-input" placeholder="Add a task..." />
                <button class="tw-button">Add</button>
                <ul class="tw-list"></ul>
                <button class="tw-clear">Clear All</button>
            `;

            this.input = this.container.querySelector(".tw-input");
            this.addButton = this.container.querySelector(".tw-button");
            this.list = this.container.querySelector(".tw-list");
            this.clearButton = this.container.querySelector(".tw-clear");

            this.renderList();
        }

        // -------------------------
        // Render Todo Items
        // -------------------------
        renderList() {
            this.list.innerHTML = "";

            this.todos.forEach((todo, index) => {
                const li = document.createElement("li");
                li.textContent = todo;

                const removeBtn = document.createElement("button");
                removeBtn.textContent = "x";
                removeBtn.style.marginLeft = "10px";
                removeBtn.style.cursor = "pointer";

                removeBtn.addEventListener("click", () => {
                    this.removeTodo(index);
                });

                li.appendChild(removeBtn);
                this.list.appendChild(li);
            });
        }

        // -------------------------
        // Add Todo
        // -------------------------
        addTodo() {
            const value = this.input.value.trim();
            if (!value) return;

            this.todos.push(value);
            this.saveToStorage();
            this.renderList();

            this.input.value = "";
        }

        // -------------------------
        // Remove Todo
        // -------------------------
        removeTodo(index) {
            this.todos.splice(index, 1);
            this.saveToStorage();
            this.renderList();
        }

        // -------------------------
        // Clear All
        // -------------------------
        clearAll() {
            this.todos = [];
            localStorage.removeItem(this.storageKey);
            this.renderList();
        }

        // -------------------------
        // Event Listeners
        // -------------------------
        attachEvents() {
            this.addButton.addEventListener("click", () => this.addTodo());

            this.input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.addTodo();
                }
            });

            this.clearButton.addEventListener("click", () => this.clearAll());
        }

    }

    // Instantiate Single Instance
    new TodoWidget();
    //refactored for testing
    if (typeof module !== "undefined") {
    module.exports = TodoWidget;
    }

})();
