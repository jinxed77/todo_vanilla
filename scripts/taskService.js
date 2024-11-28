import { showError } from './errorHandler.js';

export const loadTasks = async () => {
    try {
        const response = await axios.get('/api/todos');
        return response.data;
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Ошибка загрузки задач. Попробуйте позже.');
        throw error;
    }
};

export const addTask = async (title) => {
    try {
        const response = await axios.post('/api/todos', { title });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
        showError('Ошибка добавления задачи. Попробуйте позже.');
        throw error;
    }
};

export const toggleTaskCompletion = async (id, completed) => {
    try {
        await axios.put(`/api/todos/${id}`, { completed });
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Ошибка изменения статуса задачи. Попробуйте позже.');
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`/api/todos/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Ошибка удаления. Попробуйте позже.');
        throw error;
    }
};
