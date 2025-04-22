document.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("tasks");
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const suggestedTasks = document.getElementById("suggested-tasks");

    addTaskButton.addEventListener("click", () => {
        const taskName = taskInput.value.trim() || suggestedTasks.value;
        if (!taskName) {
            alert("Пожалуйста, введите или выберите задачу");
            return;
        }
        const newTask = {
            id: Date.now(),
            name: taskName,
            status: "pending"
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = "";
        suggestedTasks.value = "";
        renderTasks();
    });

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = document.createElement("li");
            taskElement.textContent = task.name;

            const statusSelect = document.createElement("select");
            const statuses = ["В ожидании", "В процессе", "Завершено"];
            statuses.forEach(status => {
                const option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                if (task.status === status) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });

            statusSelect.addEventListener("change", (e) => {
                updateTaskStatus(task.id, e.target.value);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteTask(task.id);
            });

            taskElement.appendChild(statusSelect);
            taskElement.appendChild(deleteButton);
            taskList.appendChild(taskElement);
        });
    }

    function updateTaskStatus(taskId, newStatus) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.status = newStatus;
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();
});