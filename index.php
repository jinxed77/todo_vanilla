<?php

header("Content-Type: application/json");

// Путь к файлу с данными
define('DATA_FILE', __DIR__ . '/todos.json');

// Чтение данных из файла
function readData()
{
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, json_encode([])); // Создаем файл, если его нет
    }
    $data = file_get_contents(DATA_FILE);
    return json_decode($data, true);
}

// Сохранение данных в файл
function saveData($data)
{
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

// Получение метода запроса
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$path = $_SERVER['REQUEST_URI'];

// Обработка маршрутов
if (preg_match('/api\/todos\/(\d+)$/', $path, $matches)) {
    $todos = readData();
    $id = (int)$matches[1];
    $key = array_search($id, array_column($todos, 'id'));

    if ($key === false) {
        http_response_code(404);
        echo json_encode(['error' => 'Task not found']);
        exit;
    }

    if ($method === 'PUT') {
        // Обновить задачу
        if (isset($input['completed'])) {
            $todos[$key]['completed'] = (bool)$input['completed'];
        }
        saveData($todos);
        echo json_encode($todos[$key]);
        exit;
    }

    if ($method === 'DELETE') {
        // Удалить задачу
        array_splice($todos, $key, 1);
        saveData($todos);
        http_response_code(204);
        exit;
    }
} elseif (str_contains($path, '/api')) {
    $todos = readData();

    if ($method === 'GET') {
        // Получить список задач
        echo json_encode($todos);
        exit;
    }

    if ($method === 'POST') {
        // Добавить новую задачу
        if (!isset($input['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title is required']);
            exit;
        }
        $newTask = [
            'id' => count($todos) > 0 ? max(array_column($todos, 'id')) + 1 : 1,
            'title' => $input['title'],
            'completed' => false
        ];
        $todos[] = $newTask;
        saveData($todos);
        http_response_code(201);
        echo json_encode($newTask);
        exit;
    }
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
