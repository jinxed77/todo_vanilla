import { loadTasks, addTask, toggleTaskCompletion, deleteTask } from './taskService.js';
import { renderTasks, addTaskToList } from './taskRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    const initialize = async () => {
        try {
            tasks = await loadTasks();
            renderTasks(tasks, taskList);
        } catch (error) {
            console.error('Error initializing tasks:', error);
        }
    };

    addTaskBtn.addEventListener('click', async () => {
        const title = taskInput.value.trim();
        if (title) {
            try {
                const newTask = await addTask(title);
                tasks.push(newTask);
                addTaskToList(newTask, taskList);
                taskInput.value = '';
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    });

    window.toggleTaskCompletion = async (id, completed) => {
        try {
            await toggleTaskCompletion(id, completed);
            tasks = await loadTasks();
            renderTasks(tasks, taskList);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    window.deleteTask = async (id) => {
        try {
            await deleteTask(id);
            tasks = await loadTasks();
            renderTasks(tasks, taskList);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    initialize();
});
