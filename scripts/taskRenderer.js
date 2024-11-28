export const addTaskToList = (task, taskList) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.title}</span>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id}, this.checked)">
        <button class="delete" onclick="deleteTask(${task.id})">Удалить</button>
    `;
    taskList.appendChild(li);
};

export const renderTasks = (tasks, taskList) => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        addTaskToList(task, taskList);
    });
};
